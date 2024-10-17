// src/components/Image.jsx
import React from 'react';
import LazyLoad from 'react-lazyload';

const Image = React.memo(({ image }) => {
    return (
        <div className="mb-5 group bg-white hover:p-2 transition-all duration-300 rounded-[10px]">
            <div className="overflow-hidden">
                <LazyLoad height={200} offset={100} once>
                    <img
                        src={image.urls.small}
                        alt={image.alt_description}
                        className="w-full h-auto rounded-[10px]"
                    />
                </LazyLoad>
            </div>
            <div className="mt-0 max-h-0 overflow-hidden opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-300">
                <p className="text-[20px] text-black font-normal leading-normal mt-2">
                    {image.description || image.alt_description}
                </p>
                <p className="text-[12px] text-black font-normal leading-normal mt-1">
                    Foto por{' '}
                    <a
                        href={image.user.links.html}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        {image.user.name}
                    </a>{' '}
                    en{' '}
                    <a
                        href="https://unsplash.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        Unsplash
                    </a>
                </p>
            </div>
        </div>

    );
});

export default Image;
