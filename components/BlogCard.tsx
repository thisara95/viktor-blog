import { BlogPost } from '@/types/blog';
import Image from 'next/image';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const imageUrl = post.cover?.formats?.medium?.url ||
    post.cover?.url ||
    '/placeholder-image.jpg';

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full bg-gray-200">
        {post.cover && (
          <Image
            src={imageUrl.startsWith('http') ? imageUrl : `https://cms.viktor.ai${imageUrl}`}
            alt={post.cover.alternativeText || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>

      <div className="p-6">
        {post.blogpost_categories && post.blogpost_categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.blogpost_categories.map((category) => (
              <span
                key={category.id}
                className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        <h2 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            {post.author && (
              <span className="font-medium">{post.author.full_name}</span>
            )}
          </div>
          <time dateTime={post.publication_date}>
            {formatDate(post.publication_date)}
          </time>
        </div>
      </div>
    </article>
  );
}
