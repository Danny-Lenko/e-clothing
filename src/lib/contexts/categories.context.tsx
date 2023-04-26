import { createContext, useState, useEffect } from 'react'
import { ApolloError, gql, useQuery } from '@apollo/client'

export interface ICategory {
   id: number
   name: string
   price: number
   imageUrl: string
}

export interface ICollection {
   id: number
   title: string
   items: ICategory[]
}

export interface ICollectionsData {
   collections: ICollection[]
}

interface CategoriesContextProps {
   categoriesMap: Record<string, ICategory[]>
   loading: boolean
   error?: ApolloError
}

export const CategoriesContext = createContext<CategoriesContextProps>({
   categoriesMap: {},
   loading: false,
   error: undefined,
})

const COLLECTIONS = gql`
   query GetCollections {
      collections {
         id
         title
         items {
            id
            name
            price
            imageUrl
         }
      }
   }
`

export const CategoriesProvider = ({
   children,
}: {
   children: React.ReactNode
}) => {
   const [categoriesMap, setCategoriesMap] = useState<
      Record<string, ICategory[]>
   >({})
   const { loading, error, data } = useQuery<ICollectionsData>(COLLECTIONS)

   useEffect(() => {
      if (data) {
         const { collections } = data
         const collectionsMap = collections.reduce<Record<string, ICategory[]>>(
            (acc, collection) => {
               const { title, items } = collection
               acc[title.toLowerCase()] = items
               return acc
            },
            {}
         )
         setCategoriesMap(collectionsMap)
      }
   }, [data])

   const value: CategoriesContextProps = { categoriesMap, loading, error }

   return (
      <CategoriesContext.Provider value={value}>
         {children}
      </CategoriesContext.Provider>
   )
}
