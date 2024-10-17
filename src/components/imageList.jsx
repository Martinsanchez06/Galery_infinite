import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from './image';
import Masonry from 'react-masonry-css'; // Importa Masonry

function ImageList({ searchTerm }) {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const accessKey = '4DGkLkUWTP42bHxZlrocwPiEiuEjq7UMZZXmakNOuNs';

    const fetchImages = () => {
        if (loading) return;

        console.log('Fetching images, page:', page, 'searchTerm:', searchTerm);

        setLoading(true);
        setError(null);

        let endpoint = '';
        let params = {
            page: page,
            per_page: 10,
        };

        if (searchTerm) {
            endpoint = `https://api.unsplash.com/search/photos`;
            params.query = searchTerm;
        } else {
            endpoint = `https://api.unsplash.com/photos`;
        }

        axios
            .get(endpoint, {
                params: params,
                headers: {
                    Authorization: `Client-ID ${accessKey}`,
                },
            })
            .then((res) => {
                let newImages;
                if (searchTerm) {
                    newImages = res.data.results;
                    if (page >= res.data.total_pages || res.data.total_pages === 0) {
                        setHasMore(false);
                    }
                } else {
                    newImages = res.data;
                    if (newImages.length === 0) {
                        setHasMore(false);
                    }
                }

                setImages((prevImages) => [...prevImages, ...newImages]);
                setPage((prevPage) => prevPage + 1);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching images from Unsplash API', err);
                setError('Hubo un problema al cargar las imágenes. Por favor, inténtalo de nuevo más tarde.');
                setLoading(false);
            });
    };

    useEffect(() => {
        setImages([]);
        setPage(1);
        setHasMore(true);
        fetchImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    const breakpointColumnsObj = {
        default: 5, // Número de columnas por defecto
        1200: 4,
        992: 3,
        768: 2,
        576: 1,
    };

    return (
        <div className="px-4">
            {error && <p className="text-red-500 text-center my-4 w-[90vw]">{error}</p>}
            {loading && images.length === 0 && <h4 className="text-center my-4 text-white">Cargando imágenes...</h4>}
            <InfiniteScroll
                dataLength={images.length}
                next={fetchImages}
                hasMore={hasMore}
                loader={
                    loading && images.length > 0 ? (
                        <h4 className="text-center my-4 text-white">Cargando más imágenes...</h4>
                    ) : null
                }
                endMessage={<p className="text-center my-4 text-white">No hay más imágenes para mostrar</p>}
            >
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex w-auto w-[90vw] m-auto" // Ajustes para Tailwind
                    columnClassName="pl-5 bg-clip-padding"
                >
                    {images.map((image) => (
                        <Image key={image.id} image={image} />
                    ))}
                </Masonry>
            </InfiniteScroll>
        </div>

    );
}

export default ImageList;
