function How() {
  return (
    <div className="container mx-auto pt-5 text-center">
      {/* Random video placeholder */}
      <h1>How Scoring SYSTEM works</h1>
      <iframe
        width="1200"
        height="800"
        className="pt-3"
        src="https://www.youtube.com/embed/PgwKK16IZ34?si=qOsiV-9LiKHfG55u&origin=http://localhost:3000/demo"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

export default How;
