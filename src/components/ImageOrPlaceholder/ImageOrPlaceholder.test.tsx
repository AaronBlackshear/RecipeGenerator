import { render, screen } from '@testing-library/react'
import { ImageOrPlaceholder } from '@components/ImageOrPlaceholder';

describe('ImageOrPlaceholder', () => {
  it('renders placeholder image', () => {
    render(
      <ImageOrPlaceholder src={''} alt="" />
    )

    expect(screen.getByTestId('image-or-placeholder_placeholder')).toBeTruthy()
  })

  it('renders image path', () => {
    const imageSrc = 'https://placehold.co/600x400/EEE/31343C'
    render(
      <ImageOrPlaceholder src={imageSrc} alt="" />
    )

    expect(screen.getByTestId('image-or-placeholder_image-wrapper')).toBeTruthy()
  })
})