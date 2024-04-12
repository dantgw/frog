/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput,parseEther } from 'frog'
import { devtools } from 'frog/dev'
import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { createSystem } from 'frog/ui'

// import abi from '../../contracts/groupBuy';

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

const { Image, Row, Rows, Text } = createSystem()

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {/* <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ''}`
            : 'Welcome!'}
        </div> */}
        {/* <img src="/chili-crab.png"  alt="Chili Crab" style={{
          alignItems: 'center',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}/> */}
        <Image src="/laksa.jpeg"/>
        <div
        style={{
          alignItems: 'center',
          background: 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '50px',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >

        <Text>Chilli Crab Offer</Text>
      </div>
  
      </div>
    ),
    intents: [
      <Button.Transaction
      target="/send-ether">
      Buy
      </Button.Transaction>,
      
      <Button.Transaction target="/send-ether">
        Withdraw
      </Button.Transaction>,
      <Button.Transaction target="/send-ether">
      Send Eth
      </Button.Transaction>,
   
    ],
  })
})

app.transaction('/send-ether', (c) => {
  return c.send({
  chainId: 'eip155:84532',
  to: '0x91A8BF832319A65e1de3F870578aF0411375C0EA',
  value: parseEther('0.0001'),
  })
})

// app.transaction('/buy', (c) => {
//   return c.send({
//   chainId: 'eip155:84532',
//   to: '0x619e9f58fb0430fba5c0a9fcc4a76d016ce3bff4',
//   value: parseEther('0.0001'),
//   })
// })

// app.transaction('/withdraw', (c) => {
//   return c.send({
//   chainId: 'eip155:84532',
//   to: '0x619e9f58fb0430fba5c0a9fcc4a76d016ce3bff4',
//   value: parseEther('0.0001'),
//   })
// })

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
