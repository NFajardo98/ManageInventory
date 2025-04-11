"use client"

import Loader from "@/components/Loader"
import ProductCard from "@/components/ProductCard"
import { getProductDetails } from "@/lib/actions/actions"
import { useUser } from "@clerk/nextjs"
import { use, useEffect, useState } from "react"

const Favorites = () => {
  const { user } = useUser()

  const [loading, setLoading] = useState(true)
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null)
  const [favorites, setFavoriteslist] = useState<ProductType[]>([])

  const getUser = async () => {
    try {
      const res = await fetch("/api/users")
      const data = await res.json()
      setSignedInUser(data)
      setLoading(false)
    } catch (err) {
      console.log("[users_GET", err)
    }
  }

  useEffect(() => {
    if (user) {
      getUser()
    }
  }, [user])

  const getFavoriteslistProducts = async () => {
    setLoading(true)

    if (!signedInUser) return

    const favoriteslistProducts = await Promise.all(signedInUser.favorites.map(async (productId) => {
      const res = await getProductDetails(productId)
      return res
    }))

    setFavoriteslist(favoriteslistProducts)
    setLoading(false)
  }

  useEffect(() => {
    if (signedInUser) {
      getFavoriteslistProducts()
    }
  }, [signedInUser])

  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser)
  }


  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">Your Favorites</p>
      {favorites.length === 0 && (
        <p>No items in your favorites</p>
      )}

      <div className="flex flex-wrap justify-center gap-16">
        {favorites.map((product) => (
          <ProductCard key={product._id} product={product} updateSignedInUser={updateSignedInUser}/>
        ))}
      </div>
    </div>
  )
}

export const dynamic = "force-dynamic";

export default Favorites