import {useEffect, useState} from 'react'
import * as React from "react"
import {useForm} from "react-hook-form"
import './App.css'
import kaboom from "kaboom"
import Web3 from "web3/dist/web3.min.js";
import ItemToken from './abis/ItemToken.json'

const App = () => {

  const uris =
  [
    'https://i.imgur.com/eU4Ww4q.png',
    'https://i.imgur.com/cA6vwIw.png',
    'https://i.imgur.com/AvupuK5.png',
    'https://i.imgur.com/NcPbCFQ.png',
    'https://i.imgur.com/aVviGzf.png',
  ]

  const [account, setAccount] = useState(null)
  const [token, setToken] = useState(null)
  const [totalSupply, setTotalSupply] = useState(null)
  const [burnt, setBurnt] = useState(null)
  const [tokenURIs, setTokenURIs] = useState([])
  const [tokenIds, setTokenIds] = useState([])
  const [duplicateTokens, setDuplicateTokens] = useState([])
  const [name, setName] = useState(null)
  const [balanceChanged, setBalanceChanged] = useState(null)
  const [loadChanged, setLoadChanged] = useState(null)

useEffect(() => {

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying Metamask!')
    }
  }

  const loadBlockchainData = async () => {
    setTokenIds(tokenIds => [])
    setTokenURIs(tokenURIs => [])
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log("account", accounts[0])
    setAccount(accounts[0])

    // Load smart contract
    const networkId = await web3.eth.net.getId()

    const networkData = ItemToken.networks[networkId]
    if(networkData) {
      const abi = ItemToken.abi
      const address = networkData.address
      const token = new web3.eth.Contract(abi, address)
      setToken(token)
      const totalSupply = await token.methods.totalSupply().call()
      const name = await token.methods.name().call()
      setTotalSupply(parseInt(totalSupply))
      let burnAmount = await token.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call()
      setBurnt(burnt => burnAmount)

      let balanceOf = await token.methods.balanceOf(accounts[0]).call()
      for (let i = 0; i < balanceOf; i++) {
        let id = await token.methods.tokenOfOwnerByIndex(accounts[0], i).call()
        let tokenURI = await token.methods.tokenURI(id).call()

        setTokenIds(tokenIds => [...tokenIds, id])
        setTokenURIs(tokenURIs => [...tokenURIs, tokenURI])

      }
      await setName(name)
    }
    else{
          alert('Smart contract not deployed to network')
    }}



  const remote = async () => {
    await loadWeb3()
    await loadBlockchainData()
    await setLoadChanged(loadChanged => loadChanged + 1)
  }
  remote()


},[balanceChanged])


useEffect(() => {
if (tokenURIs.length !== 0){
    let checkArray = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
    setDuplicateTokens([...new Set(checkArray(tokenURIs))].filter(item => uris.includes(item)))
}

},[name, loadChanged])

  useEffect(() => {

    if (account != null && name != null) {

    const k = kaboom({
      global: true,
      width: 528,
      height: 528,
      scale: 1,
      debug: true,
      background: [0, 0, 0, 1],
    })

    let thisGameNFTs = []
    let luck = [true, false, false, false]

    k.loadSound('soundtrack', './sounds/forever.mp3')
    k.loadSound('explosion', './sounds/explosion.mp3')
    k.loadSound('nuke', './sounds/nuke.mp3')
    k.loadSound('chest-open', './sounds/chest_open.mp3')
    k.loadSound('immunity-start', './sounds/immunity_start.mp3')
    k.loadSound('immunity-stop', './sounds/immunity_stop.mp3')

    k.loadRoot('https://i.imgur.com/')
    k.loadSprite('player-left', 'pPVBL7J.png')
    k.loadSprite('player-right', 'hI9GDGw.png')
    k.loadSprite('player-up', 'pZqjg0n.png')
    k.loadSprite('player-down', 'ftihTbH.png')
    k.loadSprite('left-wall', 'h9n6MIc.png')
    k.loadSprite('right-wall', 'aRkFWGk.png')
    k.loadSprite('top-wall', '6lIeFmb.png')
    k.loadSprite('bottom-wall', '6lIeFmb.png')
    k.loadSprite('top-left-wall', 'q33puFy.png')
    k.loadSprite('top-right-wall', 'QcPWqbe.png')
    k.loadSprite('bottom-left-wall', 'FD4OV5s.png')
    k.loadSprite('bottom-right-wall', 'SWumN86.png')
    k.loadSprite('left-torch', 'CZHf5o6.png')
    k.loadSprite('right-torch', 'tApKS22.png')
    k.loadSprite('up-torch', 'FQrRYdg.png')
    k.loadSprite('lava-tile', 'nHhAWLn.png')
    k.loadSprite('torch-tile', '8jNYA6F.png')
    k.loadSprite('door-top', 'gLssH5h.png')
    k.loadSprite('door-left', 'PKxiYtK.png')
    k.loadSprite('left-stairs', 'PKPSZp2.png')
    k.loadSprite('ghost-left', '0MGVEwZ.png')
    k.loadSprite('ghost-right', 'ysbpe2o.png')
    k.loadSprite('wanderer-down', 'CBxQtFS.png')
    k.loadSprite('wanderer-up', 'unFX5f9.png')
    k.loadSprite('darkmage-left', 'uo5Nr1X.png')
    k.loadSprite('darkmage-right', 'EgZpxUT.png')
    k.loadSprite('tornado', '6iSGfpL.png')
    k.loadSprite('fire', 'vvZEtBj.png')
    k.loadSprite('charged-bolt', 'hsrj8Pg.png')
    k.loadSprite('storm', 'we7eyUv.png')
    k.loadSprite('stairs', 'bC3dBbM.png')
    k.loadSprite('chest-closed', '5tdiIIx.png')
    k.loadSprite('chest-opened', 'WliBmsB.png')
    k.loadSprite('bg', '7vRv1J3.png')

    k.play("soundtrack", {
        volume: 0.8,
        loop: true
    })

    k.scene("game", ({ level, score }) => {

      k.layers(['bg', 'obj', 'ui'], 'obj')

      const maps = [
       [
         'wc)ccc^c)cx',
         'a         b',
         'a      *  b',
         'a   (     b',
         '%         b',
         'a     (   b',
         'a  ( *    b',
         'a         b',
         'yd)ddddd)dz',
       ],
       [
         'wcccccccccx',
         'a       e b',
         '<         >',
         'a    }    b',
         '%   @     b',
         'a         b',
         '<     $   >',
         'a         b',
         'ydddddddddz',
       ],
       [
         'wcccccccccx',
         'a       e b',
         '<   *     >',
         'a    } !  b',
         '?         b',
         'a    ! }  b',
         '<  $      >',
         'a     *   b',
         'ydddddddddz',
       ],
       [
         'wcccccccccx',
         'a     @  $b',
         '<   *     >',
         'a      @  b',
         '?         b',
         'a  * !    b',
         '<         >',
         'a   } *   b',
         'ydddddddddz',
       ],
       [
         'wcc^ccccccx',
         'a     @   b',
         '<         >',
         'a      @  b',
         '?         b',
         'a  * ! }  b',
         '<   @     >',
         'a e   *   b',
         'ydddddddddz',
       ],
     ]


      const levelCfg = {
        width: 48,
        height: 48,
        'a': ()  => [k.sprite('left-wall'), k.area(), k.solid(), 'wall'],
        'b': ()  => [k.sprite('right-wall'), k.area(), k.solid(), 'wall'],
        'c': ()  => [k.sprite('top-wall'), k.area(), k.solid(), 'wall'],
        'd': ()  => [k.sprite('bottom-wall'), k.area(), k.solid(), 'wall'],
        'w': ()  => [k.sprite('top-left-wall'), k.area(), k.solid(), 'wall'],
        'x': ()  => [k.sprite('top-right-wall'), k.area(), k.solid(), 'wall'],
        'y': ()  => [k.sprite('bottom-left-wall'), k.area(), k.solid(), 'wall'],
        'z': ()  => [k.sprite('bottom-right-wall'), k.area(), k.solid(), 'wall'],
        '<': ()  => [k.sprite('left-torch'), k.area(), k.solid(), 'wall'],
        '>': ()  => [k.sprite('right-torch'), k.area(), k.solid(), 'wall'],
        '?': ()  => [k.sprite('door-left'), k.area(), k.solid(), 'wall'],
        '%': ()  => [k.sprite('left-stairs'), k.area(), k.solid(), 'wall', 'door'],
        '^': ()  => [k.sprite('door-top'), k.area(), 'next-level'],
        '$': ()  => [k.sprite('stairs'), k.area(), 'next-level'],
        ')': ()  => [k.sprite('up-torch'), k.area(), k.solid()],
        '(': ()  => [k.sprite('torch-tile'), k.area(), k.solid()],
        '!': ()  => [k.sprite('lava-tile'), k.area(), k.solid(), 'wall'],
        'e': ()  => [k.sprite('chest-closed'), k.area(), k.solid(), 'chest-closed'],
        '*': ()  => [k.sprite('ghost-left'), k.area(), 'ghost', 'mob', 'dangerous', { dir: -1} ],
        '}': ()  => [k.sprite('wanderer-down'), k.area(), 'wanderer', 'mob', 'dangerous', k.solid(), { dir: -1, timer: 0 } ],
        '@': ()  => [k.sprite('darkmage-left'), k.area(), 'dark-mage', 'mob', 'dangerous',  { dir: -1, timer: 0 } ],
      }

      k.addLevel(maps[level], levelCfg)
      k.add([k.sprite('bg'), k.layer('bg')])

      const scoreLabel = k.add([
        k.text('score: ' + parseInt(score), {size: 30}),
        k.pos(315,450),
        k.layer('ui'),
        {
          value: score,
        },
      ])

      k.add([k.text('level: ' + parseInt(level + 1), {size: 30}), k.pos(315,490)])
      k.add([k.text('NFT Game', {size: 45}), k.pos(55,475)])


      let PLAYER_SPEED = 120
      let stormCharged = true
      let nukeCharged = true
      let boltCharged = true
      let defCharged = true
      let isImmunity = false

      const player = k.add([
        k.sprite('player-right'),
        k.pos(5, 190),
        k.area({ width: 44, height: 44 }),
        k.solid(),
        {
          dir: k.vec2(1,0),    //right by default
        }
      ])

      player.onCollide('next-level', () =>{

        k.go("game", {
          level: (level +1) % maps.length,
          score: scoreLabel.value,
        })
      })

      player.onCollide('chest-closed', (c) => {

          k.add([
            k.sprite("chest-opened"),
            k.pos(c.pos),
            'chest-opened',
            k.area({ width: 48, height: 48 }),
            k.solid(),
          ])

          let numberNFT = Math.floor(Math.random() * uris.length)
          thisGameNFTs.push(uris[numberNFT])

          const mint_nft = async (_numberNFT) => {
          await token.methods.mint(
            account,
            uris[_numberNFT]
          )
          .send({ from: account })
          .on('transactionHash', (hash) => {})
          setBalanceChanged(balanceChanged => balanceChanged + 1)
          }

          mint_nft(numberNFT)

          c.destroy()
          k.play("chest-open", {volume: 0.4})

      })

      k.onKeyDown('left', () => {
        player.use(
          k.sprite('player-left')
        )
        player.move(-PLAYER_SPEED, 0)
        player.dir = k.vec2(-1, 0)
      })

      k.onKeyDown('right', () => {
        player.use(
          k.sprite('player-right')
        )
        player.move(PLAYER_SPEED, 0)
        player.dir = k.vec2(1, 0)
      })

      k.onKeyDown('up', () => {
        player.use(
          k.sprite('player-up')
        )
        player.move(0, -PLAYER_SPEED)
        player.dir = k.vec2(0,-1)
      })

      k.onKeyDown('down', () => {
        player.use(
          k.sprite('player-down')
        )
        player.move(0, PLAYER_SPEED)
        player.dir = k.vec2(0, 1)
      })


      k.onKeyPress('q', () => {

        if (tokenURIs.includes(uris[2]) || thisGameNFTs.includes(uris[2]) || tokenURIs.includes("https://i.imgur.com/GI3Brn0.png"))
        {
           luck = [true, false]
        }

        let isLuck = luck[Math.floor(Math.random() * luck.length)]
        luck = [true, false, false, false]

        if(nukeCharged && isLuck){
          k.destroyAll("mob")
          k.play("nuke", {volume: 0.6})
          k.shake(6)
          nukeCharged = false

          k.wait(5, () => {
            console.log('timer3s')
            nukeCharged = true
            })
        }
        else{
          nukeCharged = false
        }
      })


      k.onKeyPress('d', () => {

        if (tokenURIs.includes(uris[3]) || thisGameNFTs.includes(uris[3]) || tokenURIs.includes("https://i.imgur.com/XsrdIG1.png"))
        {
           luck = [true, false]
        }

        let isLuck = luck[Math.floor(Math.random() * luck.length)]
        luck = [true, false, false, false]

        if(defCharged && isLuck){
          defCharged = false
          isImmunity = true
          console.log('immunity for 2s')
          k.play("immunity-start", {volume: 0.6})
          k.wait(5, () => {
            console.log('timeout')
            defCharged = true
            isImmunity = false
            k.play("immunity-stop", {volume: 0.9})
            })
        }
        else{
          defCharged = false
        }
      })

      k.onKeyPress('s', () => {
        if (tokenURIs.includes(uris[0]) || thisGameNFTs.includes(uris[0]) || tokenURIs.includes("https://i.imgur.com/qALgI5Z.png")){
           PLAYER_SPEED = 270
        }
      })

      k.onKeyRelease('s', () => {
        PLAYER_SPEED = 120
      })

      k.onKeyPress('space', () => {
      if(boltCharged){
        spawnChargedBolt(player)
        boltCharged = false

        if (tokenURIs.includes(uris[4]) || thisGameNFTs.includes(uris[4]) || tokenURIs.includes("https://i.imgur.com/o6ntoZe.png")){
          k.wait(1, () => {
            boltCharged = true
          })
        }
        else{
          k.wait(3, () => {
            boltCharged = true
          })
        }

      }
      })

      k.onKeyPress('f', () => {
        if(stormCharged){
          spawnStorm(player)
          stormCharged = false
          if (tokenURIs.includes(uris[1]) || thisGameNFTs.includes(uris[1]) || tokenURIs.includes("https://i.imgur.com/mV9ypxl.png")){
              k.wait(1, () => {
              stormCharged = true
            })
          }
          else{
            k.wait(3, () => {
            stormCharged = true
          })
          }
        }
      })


      function spawnChargedBolt(p) {
        const obj = k.add([
          k.sprite('charged-bolt'),
          k.pos(p.pos.add(p.dir.scale(48))),
          'charged-bolt',
          'player-attack',
          k.area(),
          k.move(p.dir,150),
          ])
        k.wait(1, () => {
              k.destroy(obj)
          })
      }

      function spawnTornado(p, speed) {
        const obj = k.add([
          k.sprite('tornado'),
          k.pos(p.pos),
          'tornado',
          'dangerous',
          k.area(),
          k.move(p.dir, speed),
        ])
        k.wait(5, () => {
              k.destroy(obj)
          })
      }

      function spawnFire(p) {
        const obj = k.add([
          k.sprite('fire'),
          k.pos(p.pos),
          'fire',
          'dangerous',
          k.area(),
        ])
        k.wait(2, () => {
              k.destroy(obj)
          })
      }
      function spawnStorm(p) {
        const obj = k.add([
          k.sprite('storm'),
          k.pos(p.pos),
          'storm',
          'player-attack',
          k.area(),
        ])
        k.wait(2, () => {
              k.destroy(obj)
          })
      }


      k.onCollide('player-attack', 'wall', (a,w) =>{
        k.shake(4)
        k.destroy(a)
        k.play("explosion", {volume: 0.5})
      })

      k.onCollide('tornado', 'wall', (t,w) =>{
        k.shake(1)
        k.destroy(t)
      })

      k.onCollide('player-attack', 'mob', (a,m) =>{
        k.shake(2)
        k.destroy(a)
        k.destroy(m)
        k.play("explosion", {volume: 0.2})
        scoreLabel.value++
        scoreLabel.text = 'score: '+ scoreLabel.value
      })

        //Ghost MOB
        const GHOST_SPEED = 150

        k.onUpdate('ghost', (s) => {
          s.move(s.dir * GHOST_SPEED, 0)
        })

        k.onCollide('ghost', 'wall', (g) => {
          g.dir = -g.dir
          if (g.dir > 0) {
            g.use(k.sprite('ghost-right'))

          }
          else{
            g.use(k.sprite('ghost-left'))
          }

        })


        //Wanderer MOB
        const WANDERER_SPEED = 50
        const TORNADO_SPEEDS = [150,-170,200,-120]

        k.onUpdate('wanderer', (w) => {
          w.move(0, w.dir * WANDERER_SPEED)
          w.timer -= k.dt()
          if (w.timer <= 0) {
            w.dir = -w.dir
            let numberSpeed = Math.floor(Math.random() * TORNADO_SPEEDS.length)
            spawnTornado(w , TORNADO_SPEEDS[numberSpeed])

            if (w.dir > 0) {
              w.use(k.sprite('wanderer-down'))

            }
            else {
              w.use(k.sprite('wanderer-up'))

            }
            w.timer = k.rand(5)
          }
        })

        const DARKMAGE_SPEED = 80


        k.onCollide('wanderer', 'wall', (w) => {
          w.dir = -w.dir

          if (w.dir > 0) {
            w.use(k.sprite('wanderer-down'))
          }
          else{
            w.use(k.sprite('wanderer-up'))
          }
        })


        k.onUpdate('dark-mage', (d) => {
          d.move(d.dir * DARKMAGE_SPEED, 0)
          d.timer -= k.dt()
          if (d.timer <= 0) {
            d.dir = -d.dir

            if (d.dir > 0) {
              d.use(k.sprite('darkmage-right'))

            }
            else {
              d.use(k.sprite('darkmage-left'))

            }
            d.timer = k.rand(7)
            spawnFire(d)
          }
        })


        k.onCollide('dark-mage', 'wall', (w) => {
          w.dir = -w.dir

          if (w.dir > 0) {
            w.use(k.sprite('darkmage-right'))
          }
          else{
            w.use(k.sprite('darkmage-left'))
          }
        })


      player.onCollide('dangerous', () => {
        if(!isImmunity){
          k.go('lose', {score : scoreLabel.value})
        }
      })

    })

    k.scene("lose", ({ score }) => {
      k.add([k.text('GAME OVER',{size: 25}), k.origin('center'), k.pos(264,150)])
      k.add([k.text('SCORE:' + score), k.origin('center'), k.pos(k.width()/2, k.height()/2)])
      k.add([k.text('REFRESH TO TRY AGAIN', {size: 25} ), k.origin('center'), k.pos(264,450)])
    })

  k.go('game', { level: 0, score: 0 })

}},[name])


const { register, handleSubmit } = useForm()
const onSubmit = async (data) => {
  if (isNaN(parseInt(data.tokenID)) || !window.web3.utils.isAddress(data.sendTo))
  {
    alert('Token ID is not an int / Incorrect eth address')
  }
  else{
    transfer_nft(data.sendTo, parseInt(data.tokenID))
}}


const transfer_nft = async (_to, _tokenId) => {
  await token.methods.transferFrom(
    account,
    _to,
    _tokenId
  ).send({ from: account })
    setBalanceChanged(balanceChanged => balanceChanged + 1)
}


const upgrade_nft = async (_tokenIdOne, _tokenIdTwo, _tokenUriToUpgrade) => {
  await token.methods.transferToDeadAddress(
    account,
     _tokenIdOne,
     _tokenIdTwo,
     _tokenUriToUpgrade
   ).send({ from: account })
     setBalanceChanged(balanceChanged => balanceChanged + 1)
}


const imageClick = async (text) => {
  let tokenIdOne = null
  let tokenIdTwo = null
  let uriToUpgrade = String(Object.values(text))

  for (let i = 0; i<tokenURIs.length; i++){
    let tempURI = await token.methods.tokenURI(tokenIds[i]).call()
    if (tokenIdOne == null && tokenIdTwo == null){

       if (String(tempURI) === uriToUpgrade){
         tokenIdOne = parseInt(tokenIds[i])
       }
    }
    else if (tokenIdOne != null && tokenIdTwo == null) {
      if (String(tempURI) === uriToUpgrade){
        tokenIdTwo = parseInt(tokenIds[i])
      }}
    else {
      break
    }
  }
  if (tokenIdOne != null && tokenIdTwo != null){
    upgrade_nft(tokenIdOne, tokenIdTwo, uriToUpgrade)
  }
}


if (name == null) {
  return (
    <div>
      <div id="load-text">
        <h1>Deploy Smart Contract and Connect Wallet</h1>
      </div>
      <div id="load-emojis">
        <h1>???????????????</h1>
      </div>
    </div>
  );}
  else{
    return(
      <div>

          <nav>
          <h3>Items:</h3>
          {tokenURIs.map((tokenURI, key) => (
            <img src={tokenURI} key={key} data-id={key} title={tokenIds[key]} width="30px"/>
          ))}
          </nav>
          <div id="info">
          <h3>????Wallet: </h3> <span>{account}</span>
          <h3>????Contract: </h3>  <span>{name}</span>
          <h3>????Minted: </h3>  <span>{totalSupply}</span>
          <h3>????Burnt: </h3>  <span>{burnt}</span>
          </div>

          <div id="info">
          <form onSubmit={handleSubmit(onSubmit)}>
              <input type="text" placeholder="Send To" name="sendTo" {...register('sendTo', { required: true })}/>
              <input type="text" placeholder="Token ID" name="tokenID" {...register('tokenID', { required: true })}/>
              <input type="submit" value="Send" />
          </form>
            <h3>???Upgradable: </h3>
            {duplicateTokens.map((duplicateToken, key) => (
              <img src={duplicateToken} key={key} data-id={key} onClick={() => imageClick({duplicateToken})} width="25px"/>
            ))}
          </div>
      </div>
    )
  }
}

export default App;
