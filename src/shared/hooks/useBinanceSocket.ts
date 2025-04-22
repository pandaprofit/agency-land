'use client'
import { useEffect, useRef, useState } from "react"
import { tradingPairs } from "../data/tradingPairs"

export const useBinanceSocket = () => {
	const ws = useRef<WebSocket | null>(null)

	const [data, setData] = useState<Record<string, number>>({})
	const isConnected = useRef<boolean>(false)

	const pingInterval = useRef<NodeJS.Timeout | null>(null)
	const pingTimeout = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {

		// Создание сервера
		const connect = () => {
			ws.current = new WebSocket(`wss://stream.binance.com:443/stream?streams`)

			ws.current.onopen = handleOpen
			ws.current.onmessage = handleMessage
			ws.current.onclose = handleClose
			ws.current.onerror = handleError
		}

		// Открытие сервера
		const handleOpen = () => {
			isConnected.current = true

			try {
				if (ws.current?.readyState === WebSocket.OPEN) {
					ws.current.send(JSON.stringify({
						method: "SUBSCRIBE",
						params: tradingPairs.map(pair => `${pair.toLowerCase()}@ticker`),
						id: Date.now()
					}));
				}
			} catch (error) {
				console.error('Ошибка при отправке подписки:', error)
			}

			startPing()
		}

		// Запуск пинга для поддержки сервера
		const startPing = () => {
			pingInterval.current = setInterval(() => {
				if (ws.current?.readyState === WebSocket.OPEN) {
					ws.current.send(JSON.stringify({
						method: "LIST_SUBSCRIPTIONS",
						id: Date.now()
					}))
					heartbeat()
				}
			}, 30000)
		}

		const heartbeat = () => {
			if (pingTimeout.current) {
				clearTimeout(pingTimeout.current)
			}

			pingTimeout.current = setTimeout(() => {
				if (ws.current?.readyState === WebSocket.OPEN) {
					ws.current.close()
				}
			}, 5000)
		}

		// Получение данных
		const handleMessage = (event: MessageEvent) => {
			try {
				const recievedData = JSON.parse(event.data)

				if (recievedData.data && recievedData.data.s) {
					setData(prev => ({
						...prev,
						[recievedData.data.s]: `${(recievedData.data.c * 100) / 100}$`,
					}))
				}

				if (recievedData.result !== undefined) {

					if (pingTimeout.current) {
						clearTimeout(pingTimeout.current)
					}

					return
				}
			} catch (error) {
				console.error('Ошибка при получении данных:', error)
			}
		}

		// Закрытие сервера
		const handleClose = () => {
			isConnected.current = false
			cleanup()

			setTimeout(reconnect, 5000)
		}

		// Вывод ошибки Вебсокета
		const handleError = (event: Event) => {
			console.error('WebSocket error', event)
			handleClose()
		}

		// Очистка пинга
		const cleanup = () => {
			clearInterval(pingInterval.current!)
		}

		const reconnect = () => {
			setTimeout(connect, 5000)
		}

		// Запуск сервера
		connect()

		return () => { cleanup(); ws.current?.close() }
	}, [])

	return { data, isConnected }
}
