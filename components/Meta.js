export default function Meta({
  title,
  description,
  image,
  imageWidth,
  imageHeight
}) {
  return (
    <>
      <meta name="description" content={description} />

      {/* Google / Search Engine Tags */}
      <meta itemprop="name" content="ReSeq" />
      <meta itemprop="description" content={description} />
      <meta itemprop="image" content={image} />

      {/* Facebook Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="ReSeq" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={imageWidth} />
      <meta property="og:image:height" content={imageHeight} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  )
}
