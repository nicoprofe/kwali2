import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Accordion from '../components/Accordion'
import { Link } from 'react-router-dom'

export default function Faq() {
  

  const [ selectedCategory, setSelectedCategory ] = useState('all')


  const [ list, setList ] = useState([
    {
      question: '¿El corte de mi sticker puede ser con la forma de mi diseño?',
      answer: 'Sí, nosotros imprimimos tus stickers con la línea de corte que nos indiques tú mismo, o ya sea con ayuda de nuestros diseñadores. Esto no aplica en los productos donde existan formas preestablecidas (Water Tape, Etiquetas, Imanes).',
      category: 'stickers',
    },
    {
      question: '¿Cuánto puede durar mi sticker?',
      answer: 'La durabilidad de tus stickers dependerá del lugar donde se coloquen y el cuidado que se les de, y podría variar entre 3-5 años.',
      category: 'stickers',
    },
    {
      question: '¿Cómo elijo el tamaño para mi sticker?',
      answer: 'En nuestra sección “Cómo ordenar” contamos con una sencilla guía de dimensiones para que puedas tener una referencia visual de qué tan grandes lucirán tus stickers. También te recordamos que en base al tamaño elegido nuestro diseñador tomará el lado más grande de tu diseño y lo hará coincidir con la medida seleccionada (esto para no distorsionar tu diseño). ',
      category: 'stickers',
    },
    {
      question: '¿Cuáles son los tamaños mínimos y máximos de sus stickers?',
      answer: 'En todos nuestros productos personalizados contamos con diversas medidas preestablecidas que puedes elegir según se ajusten mejor a tus necesidades. Si requieres una medida específica que no tenemos en nuestro menú, puedes ponerte en contacto directamente con nosotros y te ayudaremos a procesar tu pedido.',
      category: 'stickers',
    },
    {
      question: '¿En qué superficies puedo pegar mis stickers?',
      answer: 'Nuestros stickers se adhieren fácilmente a cualquier superficie limpia y sin rugosidades (puedes pegarlos en tu escritorio, cuadernos, laptop, termo, auto, etc.). Recuerda que entre menos se pueda adherir y conservar el pegamento, menos tiempo durará tu sticker',
      category: 'stickers',
    },
    {
      question: '¿Los stickers kiss-cut vienen con papel de despliegue individual?',
      answer: 'Sí, nuestros stickers tipo kiss-cut vienen en un papel individual de despliegue donde los puedes desprender cada uno con su suaje. Puedes aprovechar el papel de despliegue e incluir un diseño que complemente tu sticker.',
      category: 'stickers',
    },
    {
      question: '¿Qué diferencia hay entre mate y brillante?',
      answer: 'El acabado “mate” de nuestros stickers es plano y no refleja mucha luz, son suaves al tacto y no resbalan, por el contrario el acabado “brillante” refleja luz y da una apariencia de ser “plástico” o resbaladizo. ',
      category: 'stickers',
    },
    {
      question: '¿Qué son los stickers holográficos?',
      answer: 'Los stickers holográficos son impresos en un vinilo especial que al reflejar la luz da un efecto “tornasol”o “arcoiris”, esto se podrá lograr gracias a que no usamos tinta blanca en la impresión y por lo tanto permite que el efecto holográfico se aprecie en los colores más claros. Ten en cuenta esto al realizar tus diseños para estos stickers. ',
      category: 'stickers',
    },
    {
      question: '¿Qué son los stickers metálicos?',
      answer: 'Los stickers metálicos son impresos en un vinilo especial que al reflejar la luz da un efecto “metálico” , esto se podrá lograr gracias a que no usamos tinta blanca en la impresión y por lo tanto permite que el efecto metálico se aprecie en los colores más claros. Ten en cuenta esto al realizar tus diseños para estos stickers.',
      category: 'stickers',
    },
    {
      question: '¿Qué son los stickers espejos?',
      answer: 'Los stickers tipo espejo son impresos en un vinilo especial estilo metálico que refleja la luz más de lo normal creando un efecto “espejo”, esto se podrá lograr gracias a que no usamos tinta blanca en la impresión y por lo tanto permite que el efecto metálico se aprecie en los colores más claros. Ten en cuenta esto al realizar tus diseños para estos stickers.',
      category: 'stickers',
    },
    {
      question: '¿Qué son los stickers transparentes?',
      answer: 'Nuestros stickers transparentes están impresos en un vinil adhesivo transparente. Gracias a esto podrás apreciar la textura de la superficie donde los pegues a través de este vinil.',
      category: 'stickers',
    },
    {
      question: '¿Qué son los stickers de piso?',
      answer: 'Los stickers de piso están hechos de un vinil resistente que fácilmente puedes colocar en tu negocio o establecimiento, ya sea como forma de señalización, publicidad, o para darle vida a un lugar.',
      category: 'stickers',
    },
    {
      question: '¿Cómo puedo limpiar mis stickers de piso?',
      answer: 'Puedes limpiarlos con agua con toda tranquilidad, como limpiarías normalmente tus pisos.',
      category: 'stickers',
    },
    {
      question: '¿En donde puedo colocar mis stickers de piso?',
      answer: 'Aunque nuestros stickers de piso son altamente resistentes y fabricados para una larga duración, te recomendamos no colocarlos en exteriores donde estén expuestos a factores externos. Así mismo asegúrate al momento de pegarlos que sea en superficies lisas y secas, para que el pegamento pueda adherirse mejor y durar mucho más.',
      category: 'stickers',
    },
    {
      question: '¿Sus stickers resisten al agua?',
      answer: 'Sí, nuestros stickers de vinilo son resistentes al agua.',
      category: 'stickers',
    },
    {
      question: '¿Qué tanto pueden variar los colores de la impresión?',
      answer: 'Para la impresión de nuestros productos en Kwali no utilizamos tinta blanca, por lo que al imprimir en un material que no sea vinil blanco (holográfico, metálico, espejo, transparente, water tape) verás un cambio en la tonalidad de tus colores: entre más blanco tenga el color, más notorio será el cambio.' +
      'Te invitamos a probar nuestro set de muestras para que puedas apreciar con mejor claridad como el material donde imprimas afectará tus colores y poder utilizarlo a tu favor.',
      category: 'impresion',
    },
    {
      question: '¿Qué colores usan en sus impresiones?',
      answer: 'Todos nuestros productos se imprimen a color sobre el material que elijas, tal como se encuentra en tu diseño. Si tu archivo es RGB pueden existir variaciones en los tonos debido al cambio a modo CMYK que se usa para las impresiones.',
      category: 'impresion',
    },
    {
      question: '¿Cómo se verá mi producto final?',
      answer: 'Antes de mandar a producción tu pedido realizaremos una prueba de impresión digital (preview) que contenga la información necesaria para ti de acuerdo al producto que hayas solicitado (líneas de corte, texturas, etc.) para que puedas darte una idea de cómo lucirá el producto final. Recuerda que al ser una prueba digital no se verá 100% igual al producto final, por lo que debes tomar en cuenta el material en donde se imprimirá.' + 
      'Si tienes alguna duda sobre nuestros materiales te recomendamos adquirir nuestro paquete de muestras.',
      category: 'impresion',
    },
    {
      question: '¿Puedo pedir modificaciones a la prueba de impresión?',
      answer: 'Antes de aprobar tu prueba de impresión puedes pedir los ajustes necesarios en tu sección de Historial de pruebas en el botón de “pedir cambios”. Recuerda que una vez aprobada tu prueba de impresión empezará la producción inmediata y no podrás realizar cambios.',
      category: 'impresion',
    },
    {
      question: '¿De qué material están hechas las etiquetas?',
      answer: 'Nuestras etiquetas están hechas con un material más delgado que el vinilo que usamos en nuestros stickers, esto debido a que las etiquetas se suelen usar en empaques desechables y no necesitan una resistencia alta.',
      category: 'impresion',
    },
    {
      question: '¿Qué es el Water Activated Tape?',
      answer: 'El Water Activated Tape es una cinta de embalaje que activa su pegamento al entrar en contacto con el agua. Una vez adherida no se puede despegar, por lo que resulta útil para proteger tus paquetes de los robos o manipulación.  Este producto es perfecto para proteger y/o decorar cajas y paquetería gracias a su alta resistencia (superior a las cintas no-basadas en agua).',
      category: 'otrosProductos',
    },
    {
      question: '¿Qué incluye su paquete de muestras?',
      answer: 'En Kwali creamos un paquete de muestras para que puedas apreciar todos nuestros materiales y sus distintos acabados. En este paquete incluimos 1 pieza de cada uno de nuestros productos (a excepción de los imanes).' +
      'Este paquete está hecho con diseños preestablecidos por lo que no es necesario que mandes tu diseño o te comuniques con nosotros, solo agrega a tu carrito, finaliza tu compra y listo.',
      category: 'otrosProductos',
    },
    {
      question: '¿Cuál es la diferencia entre etiquetas y stickers?',
      answer: 'Nuestros stickers son 100% personalizables, pueden tener la forma que tu quieras y vienen en distintos tipos de vinilo; mientras que las etiquetas tienen formas preestablecidas y un solo tipo de material, además de venir en rollos. Por lo tanto te recomendamos las etiquetas si estás buscando algo para colocar en tus envases, empaques, etc.' +
      'Etiquetas: Perfecto para etiquetar o decorar empaques, cajas, envases, etc.' +
      'Stickers: Ideal para regalar y promocionar una marca, vender con tus ilustraciones, etc.',
      category: 'otrosProductos',
    },
    {
      question: '¿Tienen otros artículos personalizables?',
      answer: 'Por el momento todos los artículos que ves en nuestro menú de productos es con lo que contamos, cuando saquemos un producto nuevo te lo haremos saber inmediatamente mediante nuestro newsletter.' +
      '¿Te gustaría ver algún producto personalizable en nuestro menú? Háznoslo saber mediante un correo, nos encantaría escuchar tus ideas.',
      category: 'otrosProductos',
    },
    {
      question: 'No he recibido mi prueba de impresión',
      answer: 'Una vez finalices tu compra nuestro equipo de diseño se encargará de realizar tu prueba digital de impresión y enviarla a tu cuenta de Kwali dentro de los siguientes dos días hábiles, la cual podrás revisar en la sección de historial de pruebas. Así mismo recibirás un correo electrónico notificando esto. En caso de no recibir tu prueba en esta ventana de tiempo, te pedimos ponerte en contacto con nosotros lo más pronto posible.',
      category: 'pruebasDigitales',
    },
    {
      question: 'No tengo un diseño listo, ¿Pueden ayudarme a hacerlo?',
      answer: 'Por el momento no contamos con un servicio de diseño gráfico desde cero, nuestro equipo de diseño solo se puede encargar de ayudarte con las líneas de corte, medidas y previews. Esperamos contar con este servicio completo en un futuro y poder ayudarte.',
      category: 'pruebasDigitales',
    },
    {
      question: '¿Pueden agregarle algo a mi diseño (texto, logo, etc.)?',
      answer: 'En Kwali utilizamos al 100% el diseño que tú nos proporciones y no podemos realizar ningún tipo de modificación o ajuste. Solo podemos ayudarte agregando las líneas de corte necesarias para tu producto o dándote un preview de como quedaría impreso.',
      category: 'pruebasDigitales',
    },
    {
      question: '¿Qué es el suaje?',
      answer: 'El suaje es la línea de corte que se le dará a la silueta de tu diseño, existen dos tipos: Kiss-cut y Die-cut.',
      category: 'pruebasDigitales',
    },
    {
      question: '¿Qué formatos de archivo aceptan?',
      answer: 'Aceptamos archivos en formato .png, .jpg, .pdf, .svg .',
      category: 'pruebasDigitales',
    },
    {
      question: '¿Por qué mis stickers en la prueba digital se ven pixelados?',
      answer: 'Si tu archivo es de baja calidad, al ajustarlo a la medida que hayas seleccionado este se verá pixelado. En este caso nuestro equipo de diseño te pedirá que envíes un archivo de mejor calidad. Recuerda que tenemos una guía de diseño donde te especificamos cómo debes mandar tus archivos sin problemas en nuestra sección “Cómo ordenar”.',
      category: 'pruebasDigitales',
    },
    {
      question: '¿Cómo puedo indicar una línea de corte?',
      answer: 'Solo traza en tu archivo el borde que quieres que tenga tu diseño, o bien indica la medida para nuestro diseñador en la caja de texto que aparece al subir tu archivo. ',
      category: 'pruebasDigitales',
    },
    {
      question: 'No quiero tener borde en mis stickers',
      answer: 'Puedes especificar todo acerca del borde o suaje de tus stickers en la sección de comentarios que aparecerá antes de subir tu archivo.',
      category: 'pruebasDigitales',
    },
    {
      question: '¿A qué países realizan envíos?',
      answer: (<>Realizamos envíos a toda la Republica Mexicana. <span className='opacity-0'>dddddddddddddddddddddddddddddddd</span> </>),
      category: 'envios',
    },
    {
      question: '¿Qué costo tiene el envío?',
      answer: 'Manejamos dos tipos de envío:' +
     ' -Estándar: 5-7 días hábiles por $99mxn (a partir de $600mxn de compra el envío es gratis)' +
      '-Express: 1-2 días hábiles $180mxn',
      category: 'envios',
    },
    {
      question: '¿Cuánto tardará en llegar mi paquete?',
      answer: 'Dependiendo del servicio que contrates, se cuentan 2-3 días de producción a partir de que apruebes la prueba digital, después de esto se enviará tu paquete y se cuentan los días de envío:' +
      '-Estándar: 5-7 días hábiles ' +
      '-Express: 1-2 días hábiles',
      category: 'envios',
    },
    {
      question: '¿Manejan envíos express?',
      answer: 'Sí, manejamos envíos express por $180mxn y tienen un tiempo de entrega de 1-2 días hábiles después de producción.',
      category: 'envios',
    },
    {
      question: 'Quiero agregar otra dirección de envío',
      answer: 'En tu sección de usuario verás un botón de “mis datos”, donde podrás agregar direcciones de envío, listas para usar en tu siguiente compra.',
      category: 'envios',
    },
    {
      question: 'No sé como realizar una compra',
      answer: 'Contamos con diversas guías y videos informativos que te pueden ayudar a resolver tus dudas en nuestra sección de “cómo ordenar”.',
      category: 'compra',
    },
    {
      question: 'Quiero pedir más de la cantidad establecida máxima (mayoreo)',
      answer: 'Comunícate con nosotros por whatsapp o correo y podremos atenderte con gusto y realizar tu pedido.\n\nInfo@kwali.us\n+52 686 945 8899',
      category: 'compra',
    },
    {
      question: '¿Puedo pedir varios diseños para un mismo artículo?',
      answer: 'No, por cada artículo que agregues a tu carrito solo se puede incluir un diseño, por ejemplo, si pides una cantidad de 100 stickers, no puedes dividir 50 de ellos con un diseño y 50 con otro diseño. Para esto tendrías que pedirlos por cantidades separadas.',
      category: 'compra',
    },
    {
      question: '¿Qué promociones tienen?',
      answer: 'Todas nuestras ofertas y códigos promocionales se envían por correo mediante nuestra newsletter, si aún no estás suscrito puedes hacerlo sin costo alguno en nuestra sección de promociones.',
      category: 'compra',
    },
    {
      question: '¿Puedo obtner muestras gratis?',
      answer: 'Te invitamos a adquirir nuestro paquete de muestras pagando únicamente el costo de envío, esto para que puedas conocer todas las cualidades de nuestros distintos materiales.',
      category: 'compra',
    },
    {
      question: 'No estoy satisfecho con lo que recibí',
      answer: 'En caso de que exista un problema con tus artículos recibidos te pedimos tomes una fotografía del producto y te comuniques con nosotros mediante correo o whatsapp y nos encargaremos de darte una solución.',
      category: 'compra',
    },
    {
      question: '¿Cómo aplico mi código promocional/cupón?',
      answer: 'Introdúcelo en tu compra al momento de realizar tu pago y se aplicará de forma automática.',
      category: 'compra',
    },
    {
      question: '¿Puedo obtener muestras gratis?',
      answer: 'En Kwali nos importa ser justos con todos nuestros clientes, por lo que no podemos regalar muestras de ningún tipo. Te invitamos a conocer nuestro paquete de muestras de alta calidad en nuestra tienda a un precio muy accesible y sin necesidad de enviar diseños.',
      category: 'compra',
    },
    {
      question: '¿Qué política de privacidad tienen con el uso de archivos o productos de sus clientes?',
      answer: 'Te invitamos a que leas detenidamente nuestra política de privacidad y términos y condiciones.',
      category: 'compra',
    },
    {
      question: '¿Cómo puedo comunicarme con ustedes?',
      answer: 'Para dudas o aclaraciones puedes comunicarte directamente con nosotros mediante nuestro correo o número de whatsapp. Si tienes alguna duda de cómo realizar un pedido, te sugerimos revisar nuestra sección “cómo ordenar”.\n\nInfo@kwali.us\n+52 686 945 8899',
      category: 'contacto',
    },
    {
      question: '¿Cuentan con un local físico?',
      answer: 'Por el momento no podemos atenderte en un local físico, solo a través de nuestros medios digitales.',
      category: 'contacto',
    },
    {
      question: '¿Puedo comunicarme con ustedes mediante redes sociales?',
      answer: 'Te recomendamos que te comuniques con nosotros mediante correo electrónico o whatsapp, de este modo podemos responderte más rápido y con mayor facilidad.',
      category: 'contacto',
    },
    {
      question: '¿Cómo puedo dejar una reseña de mi experiencia?',
      answer: 'Si quieres dejar una reseña, con gusto la recibiremos por correo electrónico o en nuestras redes sociales. Agradecemos tu retroalimentación y es importante para nosotros.',
      category: 'contacto',
    }
  ])

  const [filteredList, setFilteredList] = useState(list);

  const [activeAccordion, setActiveAccordion] = useState(null); // Initialize activeAccordion as null

  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    if (selectedCategory === 'all') {
      // If 'all' is selected, show all items
      setFilteredList(list);
    } else {
      // Otherwise, filter the list based on the selected category
      setFilteredList(list.filter((item) => item.category === selectedCategory));
    }
    
    setActiveAccordion(null); // Reset activeAccordion when filtering
  }, [selectedCategory, list]);

  // Function to handle toggling of active accordion item
  const handleToggleActive = (index) => {
    setActiveAccordion(index);
  };


  return (
    <div>
      <h1 className='mt-8 mb-8 text-4xl font-semibold text-gray-900 text-center'>Preguntas frecuentes</h1>

      {/* <div className='mb-8 flex items-center px-3 md:px-96'>
        <input className='text-gray-900 text-xl pl-12 flex items-center px-3 bg-gray-200 h-12 w-full
         border-transparent ring-transparent outline-none focus:ring-transparent focus:border-transparent focus:outline-none'/>
    
        <FaSearch style={{position: "absolute", fontSize: '25px', marginLeft: '10px', marginTop: '5px', marginBottom: '5px'}}/>
      </div> */}
<div className='mb-8 flex items-center justify-center px-3 md:px-96'>
        <select
          onChange={handleChangeCategory}
          value={selectedCategory}
          className='text-gray-900 text-lg pl-6 pr-12 font-medium underline tracking-wider
           bg-gray-200 h-12 w-full rounded shadow border-transparent ring-transparent outline-none 
           focus:border-transparent focus:ring-transparent focus:outline-none'>
          <option value='all'>Todas las categorías</option>
          <option value='stickers'>Stickers</option>
          <option value='impresion'>Impresión</option>
          <option value='otrosProductos'>Otros productos</option>
          <option value='pruebasDigitales'>Pruebas digitales</option>
          <option value='envios'>Envíos</option>
          <option value='compra'>Compra</option>
          <option value='contacto'>Contacto</option>
        </select>
</div>


      <div className='h-full px-6 md:px-96 flex items-start justify-center'>
        <div className=''>
          {filteredList.map((item, key) => (
            <Accordion
              key={key}
              datas={item}
              active={key === activeAccordion} // Pass active prop to Accordion
              onClick={() => handleToggleActive(key)} // Pass onClick handler
            />
          ))}
        </div>
      </div>

      <div className='grid place-items-center mt-20 mb-20'>
      <Link to={'/contacto'}
      className=' bg-secondary-blueLight hover:bg-sky-300 active:bg-sky-400
      transition duration-150 ease-in-out px-10 md:px-12 py-2 rounded text-lg md:text-xl text-gray-900 active:text-white font-medium'>¿No encuentras lo que que estás buscando? 
        <br /> Ponte en contacto con nostros</Link>
      </div>  
    
    
    </div>
  )
}
