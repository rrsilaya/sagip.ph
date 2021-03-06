import * as express from 'express';
import { getRepository } from 'typeorm';

import { Distress, User } from '@models';
import { throwError, sphericalLawOfCosines, Sms, HOURS } from '@util';

export const addDistress = (user, { nature, long, lat, description }): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const distress = new Distress();
      Object.assign(distress, {
        nature,
        description,
        longitude: long,
        latitude: lat,
        user,
      });

      await distress.save();

      // Broadcast to circle
      const distressUser = await User.findOne(user);
      const circle = await distressUser.circle;

      for (const friend of circle) {
        const sms = new Sms();
        await sms.send(
          `Your friend ${distressUser.name} sent a distress notification for ${nature.toLowerCase()}.`,
          friend.phoneNumber,
          friend.accessToken,
        );
      }

      return resolve(distress);
    } catch (err) {
      console.log(err);
      return reject(err);
    }
  });
}

export const getDistressWithData = async ({ long, lat, distance, age = 24 }): Promise<any> => {
  let query = getRepository(Distress)
    .createQueryBuilder('distress')
    .leftJoin('distress.user', 'user')
    .leftJoin('distress.comments', 'comment')
    .select([
      'distress.id',
      'nature',
      'distress.timestamp',
      'TIMESTAMPDIFF(MINUTE, distress.timestamp, NOW()) AS age',
      'description',
      'longitude',
      'latitude',

      'user.id',
      'name',
      'phoneNumber',

      'COUNT(comment.id) AS comments'
    ])
    .addSelect(sphericalLawOfCosines(long, lat), 'distance')
    .where('distress.isActive = TRUE')
    .having('distance <= :distance AND age <= :age', { distance: distance / 1000, age: +age * 60 })
    .groupBy('distress.id')

  const distress = await query.getRawMany();

  return distress.map(distress => {
    const {
      distress_id,
      distress_timestamp,
      age,
      user_id,
      nature,
      description,
      longitude,
      latitude,
      name,
      phoneNumber,
      distance,
      comments,
    } = distress;

    return {
      id: distress_id,
      timestamp: distress_timestamp,
      age: +age / 60, // in minutes
      nature,
      description,
      longitude,
      latitude,
      distance: distance * 1000,
      comments: +comments,
      user: {
        id: user_id,
        name,
        phoneNumber,
      }
    };
  });
}

export const getDistress = async (req, res): Promise<express.Response> => {
  try {
    let { long, lat, distance, age } = req.query;
    [long, lat, distance] = [long, lat, distance].map(parseFloat);

    if (long && lat && distance) {
      const distress = await getDistressWithData({ long, lat, distance, age });

      return res.json({ distress, count: distress.length });
    }

    return throwError(res, null, { error: 'No specified longitude and latitude' }, 400);
  } catch (err) {
    return throwError(res, err);
  }
}

export const getDistressById = async (req, res): Promise<express.Response> => {
  const { long, lat } = req.query;
  const { distressId } = req.params;

  try {
    let distress: any[] | any = getRepository(Distress)
      .createQueryBuilder('distress')
      .leftJoin('distress.user', 'user')
      .select([
        'distress.id',
        'nature',
        'distress.timestamp',
        'description',
        'longitude',
        'latitude',

        'user.id',
        'name',
        'phoneNumber'
      ]);

    if (long && lat) {
      distress = distress.addSelect(sphericalLawOfCosines(long, lat), 'distance');
    }
    
    const {
      distress_id,
      distress_timestamp,
      user_id,
      nature,
      description,
      longitude,
      latitude,
      name,
      phoneNumber,
      distance
    } = await distress.where('distress.id = :distressId AND distress.isActive = TRUE', { distressId }).getRawOne();

    return res.json({
      distress: {
        id: distress_id,
        nature,
        timestamp: distress_timestamp,
        description,
        longitude,
        latitude,
        distance: distance * 1000,
        user: {
          id: user_id,
          name,
          phoneNumber,
        }
      }
    });
  } catch (err) {
    return throwError(res, err);
  }
}

export const resolveDistress = async (req, res): Promise<express.Response> => {
  const { distressId } = req.params;

  try {
    const distress = await Distress.findOne(distressId);

    if (!distress) {
      return throwError(res, null, { error: 'Distress does not exist' }, 404);
    }

    distress.isActive = false;
    await distress.save();

    return res.json({ id: distress.id });
  } catch (err) {
    return throwError(res, err);
  }
}
