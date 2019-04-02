import React from 'react';
import {StyleSheet} from 'react-native';


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
  },
  inputLabel: {
    textAlign:'center',
    fontSize: 50,
    color: "white",
    fontFamily: 'font'
  },

  inputText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'font',
    borderColor: "gray",
    borderWidth: 1,
    alignItems: 'flex-start',
    flex: 0.15
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
    justifyContent: 'center'
  },
   widebutton:{
    height:50,
    backgroundColor: 'slategray',
    borderRadius:50,
    justifyContent: 'center'
  },
  text:{
    color:'white', 
    fontSize:24,
    textAlign: 'center',
    fontFamily: 'font'
  }
});