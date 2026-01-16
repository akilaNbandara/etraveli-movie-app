import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { MovieList } from './components/MovieList'

function App() {
	const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
			<h1>Star Wars Movies</h1>
			<div className='movie-layout'>
				<div className='movie-list'>
					<MovieList />
				</div>
				<div className='movie-details'>Movie Details Comes Here</div>
			</div>
		</QueryClientProvider>
  )
}

export default App
