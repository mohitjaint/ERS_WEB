import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ERS',
    short_name: 'ERS',
    description: 'Electronics & Robotics Society - PCTE',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#f4c430',
    icons: [
      {
        src: '/logo1.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
