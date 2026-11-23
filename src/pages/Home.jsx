import { useState } from 'react';
import { motion, MotionConfig, useScroll } from 'motion/react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../css/home.css';

const products = [
  { name: 'Wireless Headphones', store: 'SoundHub', image: '/images/headPhone.png', price: 79, oldPrice: 99, rating: 4.8, reviews: 214, tag: '-20%' },
  { name: 'Classic Women Watch', store: 'Timeless Co.', image: '/images/whtcheswoman.png', price: 129, oldPrice: null, rating: 4.9, reviews: 98 },
  { name: 'Running Sneakers', store: 'Stride', image: '/images/choo.png', price: 95, oldPrice: null, rating: 4.7, reviews: 321, tag: 'New' },
];
const stores = [
  { ...products[0], category: 'Electronics', rating: 4.9 },
  { ...products[1], category: 'Accessories', rating: 4.8 },
  { ...products[2], category: 'Fashion', rating: 4.9 },
];
const steps = [
  ['01', 'bi-search', 'Discover', 'Browse products from multiple trusted stores.'],
  ['02', 'bi-bag', 'Shop', 'Add your favorite products to your cart.'],
  ['03', 'bi-truck', 'Receive', 'Track your order until it reaches your door.'],
];
const icon = name => <i aria-hidden="true" className={`bi ${name}`} />;

function Hero({ onSearch }) {
  const pick = products[0];
  return <section className="vh-campaign" aria-labelledby="campaign-title">
    <div className="vh-art"><img fetchPriority="high" src="/images/home-audio-studio.png" alt="Lavender headphones on a sculptural studio plinth" /></div>
    <div className="vh-copy">
      <span className="vh-kicker">{icon('bi-stars')} THE VENDRA MARKETPLACE</span>
      <h1 id="campaign-title">One marketplace.<br /><em>Endless finds.</em></h1>
      <p>Discover products from trusted stores, compare your favorites, and shop with confidence. All in one place.</p>
      <form className="vh-search" role="search" onSubmit={e => { e.preventDefault(); onSearch(new FormData(e.currentTarget).get('query').trim()); }}>
        {icon('bi-search')}<input type="search" name="query" aria-label="Search featured products and stores" placeholder="Search products, stores..." /><button>Search {icon('bi-arrow-right')}</button>
      </form>
      <div className="vh-stats">{[['100+', 'Trusted stores'], ['5K+', 'Products'], ['10K+', 'Shoppers']].map(([count, label]) => <div key={label}><strong>{count}</strong><small>{label}</small></div>)}</div>
    </div>
    <div className="vh-edition">{icon('bi-soundwave')} AUDIO EDIT <span>/ 01</span></div>
    <Link className="vh-pick" to={`/product/${encodeURIComponent(pick.name)}`}><span className="vh-pick-label">{icon('bi-stars')} EDITOR&apos;S PICK</span><strong>{pick.name}</strong><span className="vh-pick-meta">{pick.store}<b>${pick.price}</b></span><span className="vh-pick-arrow">{icon('bi-arrow-up-right')}</span></Link>
  </section>;
}

function SectionHeading({ label, title, children }) {
  return <div className="vh-section-head"><div><div className="vh-eyebrow">{label}</div><h2>{title}</h2></div>{children}</div>;
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [query, setQuery] = useState('');
  function search(value) {
    setQuery(value);
    document.getElementById('products')?.scrollIntoView();
  }
  const results = products.filter(p => `${p.name} ${p.store}`.toLowerCase().includes(query.toLowerCase()));
  return <MotionConfig reducedMotion="user"><motion.div aria-hidden="true" className="home-scroll-progress" style={{ scaleX: scrollYProgress }} /><main className="vh-home">
    <Hero onSearch={search} />
    <section className="vh-section" id="products"><SectionHeading label="Popular now" title="Featured products"><Link className="vh-all" to="/products">View all products {icon('bi-arrow-right')}</Link></SectionHeading>
      {query && <p role="status">{results.length} featured {results.length === 1 ? 'match' : 'matches'} for “{query}” · <button className="vh-clear" onClick={() => setQuery('')}>Show all</button></p>}
      <div className="vh-grid">{results.map(p => <ProductCard key={p.name} {...p} />)}</div>
    </section>
    <section className="vh-section" id="stores"><SectionHeading label="Shop your way" title="Featured stores" /><div className="vh-grid">{stores.map(s => <article className="store-card" key={s.store}><div className="store-cover"><img loading="lazy" src={s.image} alt="" /></div><div className="store-body"><span className="store-logo">{s.store[0]}</span><div className="store-info"><h3>{s.store}</h3><p>{s.category}</p></div><div className="store-rating">{icon('bi-star-fill')} {s.rating}</div></div><button type="button" className="btn btn-vendra-soft w-100" onClick={() => search(s.store)}>Visit store</button></article>)}</div></section>
    <section className="vh-section vh-how" id="how"><SectionHeading label="Simple shopping" title="How Vendra works" /><div className="vh-grid">{steps.map(([number, symbol, title, text]) => <article key={number} className="vh-step"><small>STEP {number}</small>{icon(symbol)}<h3>{title}</h3><p>{text}</p></article>)}</div><p className="vh-delivery">{icon('bi-truck')} Fast delivery, right to your door.</p></section>
  </main></MotionConfig>;
}
