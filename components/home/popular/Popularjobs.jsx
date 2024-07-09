import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'

import { useRouter } from 'expo-router';

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard'

import useFetch from '../../../hook/useFetch';

const Popularjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch('search', {
    query: 'React Developer',
    num_pages: 1,
  });

  console.log(data)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View>
        {/* // TODO:  Handle the Key required -> warning */}
        {
          isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Popularjobs</Text>
          ) : (
            <FlatList
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              renderItem={({ item }) => (
                <PopularJobCard
                  item={item}
                  key={(item, index) => index}
                />
              )}
              keyExtractor={item => item?.job_id} // check this
              contentContainerStyle={{ columnGap: SIZES.medium }}
              horizontal
            />
          )}
      </View>
    </View>
  )
}

export default Popularjobs