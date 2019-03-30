import 'package:flutter/material.dart';
import 'package:sagip/config/theme.dart';

import './components/location.dart';
import './components/action.dart';

class Main extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Material(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Expanded(
            flex: 5,
            child: Container(
              color: primaryColor,
              child: SafeArea(
                child: Location()
              ),
              padding: EdgeInsets.symmetric(vertical: baseSpacing)
            )
          ),
          Expanded(
            flex: 3,
            child: Padding(
              padding: EdgeInsets.all(baseSpacing),
              child: Action()
            )
          ),
        ]
      )
    );
  }
}