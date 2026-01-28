import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';

// Default placeholder images matching site aesthetic
import blog1 from '../assets/g1.png';
import blog2 from '../assets/g2.png';
import blog3 from '../assets/g3.png';

interface BlogPost {
    id: number;
    title: { rendered: string };
    excerpt: { rendered: string };
    date: string;
    link: string;
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
        }>;
    };
}

// Placeholder data for when no WP URL is connected
const PLACEHOLDER_POSTS = [
    {
        id: 1,
        title: { rendered: "Dlaczego powłoka ceramiczna to inwestycja, a nie wydatek?" },
        excerpt: { rendered: "Poznaj 5 głównych powodów, dla których warto zabezpieczyć lakier powłoką ceramiczną. Oszczędność czasu, ochrona wartości auta i nieskazitelny wygląd." },
        date: new Date().toISOString(),
        link: "#",
        image: blog1
    },
    {
        id: 2,
        title: { rendered: "Renowacja skór - jak przywrócić zapach nowości?" },
        excerpt: { rendered: "Skórzana tapicerka wymaga specjalnej troski. Zobacz proces czyszczenia i impregnacji, który sprawia, że wnętrze wygląda jak prosto z salonu." },
        date: new Date(Date.now() - 86400000 * 5).toISOString(),
        link: "#",
        image: blog2
    },
    {
        id: 3,
        title: { rendered: "Korekta lakieru vs Polerowanie - jaka jest różnica?" },
        excerpt: { rendered: "Wyjaśniamy różnice między szybkim odświeżeniem a pełną, wieloetapową korektą lakieru usuwającą do 95% zarysowań." },
        date: new Date(Date.now() - 86400000 * 12).toISOString(),
        link: "#",
        image: blog3
    }
];

const BlogSection: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // TODO: Replace with user's actual WordPress URL
    const WORDPRESS_API_URL = "";

    useEffect(() => {
        const fetchPosts = async () => {
            if (!WORDPRESS_API_URL) {
                setPosts(PLACEHOLDER_POSTS);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/posts?per_page=3&_embed`);
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
                setPosts(PLACEHOLDER_POSTS); // Fallback
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <section id="blog" className="py-24 bg-zinc-950 border-t border-zinc-900 scroll-mt-20">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-yellow-400 text-sm font-black uppercase tracking-[0.3em] mb-4">Blog & Wiedza</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-white font-orbitron italic">Eksperci Radzą</h3>
                    </div>
                    <p className="text-zinc-500 max-w-md text-right">
                        Dzielimy się wiedzą i pasją. Przeczytaj nasze artykuły o pielęgnacji aut
                        i nowościach w świecie detailingu.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => {
                        const hasWpImage = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0];
                        const imageUrl = hasWpImage ? post._embedded['wp:featuredmedia'][0].source_url : (post.image || blog1);
                        const date = new Date(post.date).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' });

                        return (
                            <article
                                key={post.id}
                                className="group bg-zinc-900/50 rounded-3xl overflow-hidden border border-white/5 hover:border-yellow-400/30 transition-all duration-300 hover:transform hover:-translate-y-2"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={imageUrl}
                                        alt={post.title.rendered}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 bg-yellow-500 text-black text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest font-orbitron">
                                        Blog
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="flex items-center gap-4 text-zinc-500 text-xs mb-4 font-mono">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-yellow-400" />
                                            {date}
                                        </div>
                                        <span>|</span>
                                        <div className="flex items-center gap-2">
                                            <User size={14} className="text-yellow-400" />
                                            W&A Team
                                        </div>
                                    </div>

                                    <h4
                                        className="text-xl font-black text-white mb-4 line-clamp-2 font-orbitron italic group-hover:text-yellow-400 transition-colors"
                                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                    />

                                    <div
                                        className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3"
                                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                    />

                                    <a
                                        href={post.link}
                                        target={WORDPRESS_API_URL ? "_blank" : "_self"}
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-yellow-400 text-xs font-black uppercase tracking-widest hover:gap-4 transition-all"
                                    >
                                        Czytaj więcej
                                        <ArrowRight size={16} />
                                    </a>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
