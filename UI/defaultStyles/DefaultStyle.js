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
    fontSize: 35,
    color: "white",
    fontFamily: 'font'
  },

  inputText: {
    fontSize: 20,
    width: "96%",
    paddingHorizontal: 12,
    marginTop: 5,
    color: 'black',
    fontFamily: 'font',
    borderColor: '#778899',
    backgroundColor: 'slategray',
    borderStyle: 'solid',
    borderRadius: 25,
    borderWidth: 1,
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