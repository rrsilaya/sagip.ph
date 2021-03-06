import axios from 'axios';

export class Sms {
  private senderAddress: string;
  private url: string;

  constructor() {
    const { SHORT_CODE } = process.env;

    this.senderAddress = SHORT_CODE.slice(SHORT_CODE.length - 4);
    this.url = `https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/${this.senderAddress}/requests?access_token=`;
  }

  public send = (content: string, address: string, access_token: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!process.env.NO_SMS) {
          const { data } = await axios.post(this.url + access_token, {
            outboundSMSMessageRequest: {
              senderAddress: this.senderAddress,
              outboundSMSTextMessage: { message: content },
              address
            }
          });
  
          return resolve(data);
        } else {
          console.log(content);
        }

        return resolve(null);
      } catch (err) {
        console.log(err);
        console.log(err.message);
        return reject();
      }
    });
  }
}

export default Sms;
