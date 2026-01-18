import { render, screen } from '@testing-library/react'
import MovieDetails from './MovieDetails'
import type { Movie } from '../../domain/Movie'

describe('MovieDetails Component', () => {
	const mockMovie: Movie = {
		episode_id: 4,
		title: 'A New Hope',
		director: 'George Lucas',
		release_date: new Date('1977-05-25'),
		release_year: 1977,
		opening_crawl: 'It is a period of civil war.\nRebel spaceships, striking\nfrom a hidden base, have won\ntheir first victory against\nthe evil Galactic Empire.',
	}

	it('should display all movie details together', () => {
		render(<MovieDetails movie={mockMovie} />)
		
		const container = screen.getByText('A New Hope').closest('div')
		expect(container?.textContent).toContain('A New Hope')
		expect(container?.textContent).toContain('George Lucas')
		expect(container?.textContent).toContain('1977')
		expect(container?.textContent).toContain('It is a period of civil war')
	})
})
