import React from 'react';
import {StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => screenWidth / guidelineBaseWidth * size;
const verticalScale = size => screenHeight / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export {scale, verticalScale, moderateScale};



export default StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:wp("5%"),
  },
  title: {
    fontFamily: 'font',
    color: "white",
    alignContent: 'center',
    alignSelf : 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: wp("15%") //b/f 100
  },
  inputLabel: {
    fontSize: wp("10%"),
    color: "white",
    fontFamily: 'font'
  },

  inputText: {
    fontSize: wp("6%"),
    width: wp("90%"),
    paddingHorizontal: wp("5%"),
    paddingVertical: wp("2%"),
    color: 'black',
    fontFamily: 'font',
    borderColor: '#778899',
    backgroundColor: 'slategray',
    borderStyle: 'solid',
    borderRadius: wp("5%"),
    borderWidth: wp(".5%"),
    alignItems: 'center',
    flex: 0.13,
  },
    infoText: {
    fontSize: wp("6%"),
    color: "white",
    fontFamily: 'font'
  },
    subTitle: {
    fontSize: wp("10%"),
    color: "white",
    fontFamily: 'font',
    textAlign: 'center',
  },
  listItem: {
    fontFamily: 'font',
    fontSize: wp("5%"),
    color: "#ddd",
    textAlign: 'center',
  },

   button:{
    width: wp("85%"), //Has width whereas the other button type does not
    height: hp("8%"),
    backgroundColor: 'slategray',
    borderRadius:wp("8%"),
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    color:'white',
    fontSize:24,
    textAlign: 'center',
    fontFamily: 'font'
  }
});
