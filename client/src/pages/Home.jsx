import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to My Courses</h1>
        <p>Explore our online course library and start learning at your own pace.</p>
        <button className="cta-button">Browse Courses</button>
      </section>

      <section className="featured-courses">
        <h2>Featured Courses</h2>
        <div className="course-grid">
          <div className="course-card">Course 1</div>
          <div className="course-card">Course 2</div>
          <div className="course-card">Course 3</div>
        </div>
      </section>
    </div>
  );
}
