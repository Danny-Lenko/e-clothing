import { createContext, useState, useEffect } from 'react'
import { ApolloError, gql, useQuery } from '@apollo/client'

interface Category {
   id: string
   name: string
   price: number
   imageUrl: string
}

interface Collection {
   id: string
   title: string
   items: Category[]
}

interface CollectionsData {
   collections: Collection[]
}

interface CategoriesContextProps {
   categoriesMap: Record<string, Category[]>
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
      Record<string, Category[]>
   >({})
   const { loading, error, data } = useQuery<CollectionsData>(COLLECTIONS)

   useEffect(() => {
      if (data) {
         const { collections } = data
         const collectionsMap = collections.reduce<Record<string, Category[]>>(
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
