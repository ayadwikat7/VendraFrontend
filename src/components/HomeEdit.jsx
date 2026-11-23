import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const departments = [
  ['Fashion', 'edit-pack.webp', 'On the move'],
  ['Electronics', 'headPhone.png', 'Plugged in'],
  ['Beauty', 'edit-perfume.webp', 'Daily rituals'],
  ['Home', 'edit-chair.webp', 'Considered spaces'],
  ['Accessories', 'edit-sunglasses.webp', 'Finishing touches'],
];
const morePicks = [
  ['Floral Perfume', 'Glow Beauty', 'Beauty', 'edit-perfume.webp', 58],
  ['Wooden Chair', 'HomeNest', 'Home', 'edit-chair.webp', 149],
  ['Summer Sunglasses', 'Optica', 'Accessories', 'edit-sunglasses.webp', 45],
  ['Urban Backpack', 'Urban Wear', 'Fashion', 'edit-pack.webp', 65],
].map(([name, store, category, image, price]) => ({ name, store, category, image: `/images/${image}`, price }));
const benefits = [
  ['truck', 'Fast delivery', 'Free delivery on orders over $50.'],
  ['shield-lock', 'Secure payment', 'Check out with confidence.'],
  ['arrow-counterclockwise', 'Easy returns', 'When a find isn’t quite right.'],
  ['patch-check', 'Trusted stores', 'Get to know the shop behind each find.'],
];
function Icon({ name }) { return <i aria-hidden="true" className={`bi bi-${name}`} />; }
function Heading({ label, title, children }) {
  return <div className="vh-section-head"><div><div className="vh-eyebrow">{label}</div><h2>{title}</h2></div>{children}</div>;
}
export function ExploreNav() {
  return <nav className="he-nav" aria-label="Explore the marketplace"><strong><Icon name="compass" /> Explore Vendra</strong>{[['grid', 'Categories', 'categories'], ['graph-up-arrow', 'Trending now', 'trending'], ['shop', 'Featured stores', 'stores'], ['stars', 'Customer reviews', 'ratings']].map(([symbol, label, id]) => <a key={id} href={`#${id}`}><Icon name={symbol} />{label}</a>)}</nav>;
}
export function Discovery({ products }) {
  const [category, setCategory] = useState('All');
  const track = useRef(null);
  const categories = ['Electronics', 'Accessories', 'Fashion'];
  const picks = [...morePicks, ...products.map((p, i) => ({ ...p, category: categories[i] }))].filter(p => category === 'All' || p.category === category);
  function select(value) { setCategory(value); track.current?.scrollTo({ left: 0, behavior: 'instant' }); }
  function page(direction) { track.current?.scrollBy({ left: direction * track.current.clientWidth * .8, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }
  return <><section className="vh-section he-section" id="categories"><Heading label="The collection index" title="Featured categories" />
    <div className="he-categories">{departments.map(([name, image, caption], i) => <a key={name} href="#trending" className="he-category" onClick={() => select(name)}><img src={`/images/${image}`} alt="" loading="lazy" /><small>EDIT / 0{i + 1}</small><div><span>{caption}</span><h3>{name}</h3></div><b><Icon name="arrow-up-right" /></b></a>)}</div>
  </section><section className="vh-section he-section" id="trending"><Heading label="The radar" title="Trending now"><div className="he-controls">{category !== 'All' && <button className="he-reset" onClick={() => select('All')}>All picks <Icon name="x" /></button>}{picks.length > 2 && [-1, 1].map(d => <button key={d} aria-label={d < 0 ? 'Previous trending products' : 'Next trending products'} onClick={() => page(d)}><Icon name={d < 0 ? 'arrow-left' : 'arrow-right'} /></button>)}</div></Heading>
    <div className="he-rail" ref={track} tabIndex="0" role="region" aria-label={`${category} trending picks`}>{picks.map((p, i) => <Link key={p.name} className="he-pick" to={`/product/${encodeURIComponent(p.name)}`}><div className="he-photo"><img src={p.image} alt="" loading="lazy" /><small>NO. {String(i + 1).padStart(2, '0')}</small></div><div className="he-caption"><span>{p.store}</span><b>${p.price}</b><h3>{p.name}</h3></div></Link>)}</div>
  </section></>;
}
export function Benefits() {
  return <section className="vh-section he-benefits he-section"><Heading label="The Vendra promise" title="Why shop with Vendra?" /><div>{benefits.map(([icon, title, copy]) => <article key={title}><span><Icon name={icon} /></span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>;
}
export function Campaign() {
  return <section className="vh-section he-banner"><div className="he-banner-copy"><span className="he-micro">MARKETPLACE EDIT / VOL. 01</span><h2>The everyday,<br /><em>reconsidered.</em></h2><p>A fresh perspective on the things you wear, use, and live with.</p><Link to="/products">Shop the collection <Icon name="arrow-right" /></Link></div><div className="he-sculpture" aria-hidden="true"><i /><i /><i /></div></section>;
}
export function Reviews({ products }) {
  return <section id="ratings" className="vh-section he-section"><Heading label="The shopper verdict" title="Customer reviews" /><div className="vh-grid">{products.map(p => <article key={p.name} className="he-rating"><div className="he-stars" aria-hidden="true">{[1,2,3,4,5].map(n => <Icon key={n} name="star-fill" />)}</div><strong>{p.rating.toFixed(1)} <small>/ 5</small></strong><p>Based on {p.reviews} customer reviews</p><Link to={`/product/${encodeURIComponent(p.name)}`}><img src={p.image} loading="lazy" alt="" /><span><b>{p.name}</b><small>{p.store}</small></span><Icon name="arrow-up-right" /></Link></article>)}</div></section>;
}
