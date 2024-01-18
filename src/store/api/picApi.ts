
import { IPic } from '@/types/pic.interface'
import { baseApi } from './baseApi'
import { variables } from '@/variables'


export const picApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getByDate: builder.query<IPic, string>({
            query: (date) => ({
                url: 'apod?api_key='+variables.API_KEY+'&date='+date,
                method: 'GET',
            }),
            providesTags: () => [{
                type: 'Pic'
            }]
        }),
        getByRange: builder.query<IPic[], {start: string, end: string}>({
            query: ({start, end}) => ({
                url: 'apod?api_key='+variables.API_KEY+'&start_date='+start + '&end_date='+end,
                method: 'GET',
            }),
            providesTags: () => [{
                type: 'Pics'
            }]
        })
    })
})

export const {
    useGetByRangeQuery,
    useGetByDateQuery
} = picApi