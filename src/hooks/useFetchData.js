import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const API_URL = 'https://api.tvmaze.com/shows';
const cleanHtml = (text = '') => (text || '')
  .replace(/<[^>]*>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/\s+/g, ' ').trim();

export default function useFetchData() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const request = useRef(null);

  const refetch = useCallback(async () => {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    let timedOut = false;
    const timeout = setTimeout(() => { timedOut = true; controller.abort(); }, 20000);
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL, { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Respuesta inesperada');
      if (request.current !== controller) return;
      setShows(data.map(show => ({
        id: show.id, name: show.name || 'Sin nombre',
        genres: Array.isArray(show.genres) ? show.genres : [],
        premiered: show.premiered, ended: show.ended,
        image: show.image?.medium || show.image?.original || null,
        summary: cleanHtml(show.summary),
      })));
    } catch (cause) {
      if (request.current !== controller || (controller.signal.aborted && !timedOut)) return;
      setError(timedOut ? 'La solicitud tardó demasiado. Intenta de nuevo.' : 'No se pudieron cargar las series. Revisa tu conexión e intenta de nuevo.');
    } finally {
      clearTimeout(timeout);
      if (request.current === controller) setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
    return () => { request.current?.abort(); request.current = null; };
  }, [refetch]);

  const filteredShows = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return shows.filter(show => show.name.toLocaleLowerCase().includes(query));
  }, [shows, search]);

  return { shows, filteredShows, search, setSearch, loading, error, refetch };
}
