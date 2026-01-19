import { View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface Props {
    placeholder: string;
    onPress?: () => void;
    value?: string;                    // Changed to optional (?)
    onChangeText?: (text: string) => void; // Changed to optional (?)
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View className='flex-row w-full bg-dark-200 items-center rounded-full px-5 py-4 border border-white/10'>
     <Image 
        source={icons.search} 
        className='size-5' 
        resizeMode='contain' 
        tintColor="#ab8bff"
     />
     
     <TextInput
       // Use onPressIn for better touch handling if it's acting as a button
       onPressIn={onPress} 
       placeholder={placeholder}
       value={value}
       onChangeText={onChangeText}
       placeholderTextColor="#ab8bff"
       className='flex-1 ml-2 text-white font-medium'
       autoCapitalize="none"
     />
    </View>
  )
}

export default SearchBar