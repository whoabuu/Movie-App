import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Set autoFetch to FALSE
  // We want to control the fetch manually when the user types, not when the component mounts.
  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset 
  } = useFetch(() => fetchMovies({ query: searchQuery }), false); 

  useEffect(() => {
    // 2. Debounce Logic
    // Wait 500ms after the user stops typing before fetching
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset(); // Clear results if text is empty
      }
    }, 500);

    // Cleanup: If user types again before 500ms, cancel the previous timer
    return () => clearTimeout(timeoutId);

  }, [searchQuery]); // <--- 3. CRITICAL: Re-run this effect when searchQuery changes

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover' />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start", // Changed to flex-start so 1 or 2 items don't float in the middle
          gap: 16,
          marginVertical: 16
        }}
        className="px-5"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>

            <View className='my-5'>
              <SearchBar
                placeholder='Search Movies...'
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (<ActivityIndicator size='large' color="#0000ff" className='my-3' />)}

            {error && (<Text className='text-red-500 px-5 my-3'>
              Error: {error.message}
            </Text>)}

          </>
        }
        ListEmptyComponent={!loading && !error ? (
          <View className='px-5 mt-10'>
             <Text className='text-center text-gray-500'>{searchQuery.trim() ? 'No movies found' : 'Search for a movie' }</Text>
          </View>
        ): null}
      />
    </View>
  )
}

export default Search