'use client'

import { useState } from "react"

const useSavePrice = () => {

	const savePrice = (key: string, price: number) => {
		localStorage.setItem(key, price.toString())
		localStorage.setItem(`${key}1`, key)
	}

	const deletePrice = (key: string) => {
		localStorage.removeItem(key)
	}
	const getPrice = (key: string) => {
		const storedKey = localStorage.getItem(`${key}1`)
		if (!storedKey) return null
		return localStorage.getItem(storedKey)
	}

	return {
		getPrice,
		savePrice,
		deletePrice
	}
}

export default useSavePrice
