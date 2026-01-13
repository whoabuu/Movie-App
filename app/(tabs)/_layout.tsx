import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import {images} from "@/constants/images"
import { icons } from '@/constants/icons'

const TabIcon = ({focused, icon, title}: any) =>{
    if(focused){
    return(
        <ImageBackground 
        source={images.highlight} resizeMode="cover"
        className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden'
        >
         <Image source={icon} resizeMode="cover" tintColor="#151312" className='size-5'/>
         <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
      </ImageBackground>
    )
   }
   return(
    <View className='size-full justify-center items-center mt-4 rounded-full'>
        <Image source={icon} resizeMode="cover" tintColor="#A8B5DB" className='size-5'/>
    </View>
   )
}

const _layout = () => {
  return (
    <Tabs 
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
            maxWidth: 120,
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
        },
        tabBarStyle:{
            backgroundColor: "#0f0D23",
            borderRadius: 50,
            marginHorizontal: 20,
            marginBottom: 30,
            height: 52,
            position: "absolute",
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#0f0d23",
            shadowColor: "#000", // Optional: Adds shadow for "floating" effect
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
        }
    }}
    >
      <Tabs.Screen name='index'
      options={{
        title:"Home", 
        headerShown: false,
        tabBarIcon: ({focused})=> (
            <TabIcon
            focused = {focused} icon={icons.home} title={"Home"}/>
        )
      }}/>

      <Tabs.Screen name='search'
      options={{
        title:"Search", 
        headerShown: false,
        tabBarIcon: ({focused})=> (
            <TabIcon focused = {focused} icon={icons.search} title={"Search"}/>
        )
      }}/>

      <Tabs.Screen name='saved'
      options={{
        title:"Saved", 
        headerShown: false,
        tabBarIcon: ({focused})=> (
            <TabIcon focused = {focused} icon={icons.save} title={"Saved"}/>
        )
      }}/>

      <Tabs.Screen name='profile'
      options={{
        title:"Profile", 
        headerShown: false,
        tabBarIcon: ({focused})=> (
            <TabIcon focused = {focused} icon={icons.person} title={"Profile"} />
        )
      }}/>
    </Tabs>
  )
}

export default _layout