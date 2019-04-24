import React from 'react';
import {StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';
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
  padding:20,
  },
 title: {
   fontFamily: 'font',
   color: "white",
   fontSize: screenWidth * 0.25 //b/f 100
  },
  inputLabel: {
    fontSize: scale(29),
    color: "white",
    fontFamily: 'font'
  },

  inputText: {
    fontSize: scale(17),
    width: "96%",
    paddingHorizontal: scale(12),
    marginTop: scale(5),
    color: 'black',
    fontFamily: 'font',
    borderColor: '#778899',
    backgroundColor: 'slategray',
    borderStyle: 'solid',
    borderRadius: scale(25),
    borderWidth: scale(1),
    alignItems: 'center',
    flex: 0.13
  },
    infoText: {
    fontSize: 23,
    color: "white", 
    fontFamily: 'font'
  },
    subTitle: {
    fontSize: 28,
    color: "white", 
    fontFamily: 'font'
  },
  listItem: {
    fontFamily: 'font',
    fontSize: 23,
    color: "#ddd"
  },

   button:{
    width: 250, //Has width whereas the other botton type does not 
    height:50,
    backgroundColor: 'slategray',
    borderRadius:50,
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