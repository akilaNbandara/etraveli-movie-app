import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import MoviePage from './pages/movie/MoviePage'

function App() {
	const queryClient = new QueryClient()

	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="/" element={<MoviePage />} />
				</Routes>
			</QueryClientProvider>
		</BrowserRouter>
	)
}

export default App
