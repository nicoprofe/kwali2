import React from 'react'
import PropTypes from 'prop-types'
import { useMediaQuery } from 'react-responsive'

const YoutubeEmbed = ({ embedId }) => {
    const isDesktop = useMediaQuery({ minWidth: '992px'})

    return (
        <div 
    style={{ position: 'relative', height: '0', overflow: 'hidden', paddingBottom: '56.25%', marginBottom: isDesktop ? 0 : '7%', marginTop: isDesktop ? 0 : '7%' }}>
       <iframe
       style={{ position: 'absolute', left: '0', bottom: isDesktop ? '70px' : 0, height: '100%', width: '100%' }}
       className='md:px-[20%] md:py-[10%]'
       width='853'
       height='480'
       src={`https://www.youtube.com/embed/${embedId}`}
       frameBorder='0'
       allowFullScreen
       allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;'
       title='Kwali - Cómo Ordenar'/>

       
    </div>
    )
}

// validate embedId
YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
}


export default YoutubeEmbed
