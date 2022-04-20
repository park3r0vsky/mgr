
import {useEffect, useState} from 'react'
import * as React from "react"
import './App.css'
import kaboom from "kaboom"
import Web3 from "web3/dist/web3.min.js";
import ItemToken from './abis/ItemToken.json'


const App = () => {

  const uris =
  [
    'https://i.imgur.com/eU4Ww4q.png',
    'https://i.imgur.com/cA6vwIw.png',
  ]

  const [account, setAccount] = useState(null)
  const [token, setToken] = useState(null)
  const [totalSupply, setTotalSupply] = useState(null)
  const [name, setName] = useState(null)
  const [tokenURIs, setTokenURIs] = useState([])
  const [count, setCount] = useState(0)


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
      setTotalSupply(totalSupply)

      let balanceOf = await token.methods.balanceOf(accounts[0]).call()
      for (let i = 0; i < balanceOf; i++) {
        let id = await token.methods.tokenOfOwnerByIndex(accounts[0], i).call()
        let tokenURI = await token.methods.tokenURI(id).call()

        setTokenURIs(tokenURIs => [...tokenURIs, tokenURI])
      }

      await setName(name)

    }
    else{
          alert('Smart contract not deployed to network')
    }

    }

    const remote = async () => {
      await loadWeb3()
      await loadBlockchainData()
    }

    const mint_nft = (_numberNFT) => {
    //let numberNFT = Math.floor(Math.random() * URIs.length)
    setCount(count => count + 1)
    token.methods.mint(
      account,
      uris[_numberNFT]
    )
    .send({ from: account })
    .on('transactionHash', (hash) => {

      setTokenURIs(tokenURIs => [...tokenURIs, uris[_numberNFT]])


    })
}

  useEffect(() => {

    if (account != null && name != null) {

    console.log(tokenURIs)

    const k = kaboom({
      global: true,
      width: 528,
      height: 576,
      scale: 1,
      debug: true,
      background: [0, 0, 0, 1],
    })

    let thisGameNFTs = []

    k.loadSound('soundtrack', './sounds/forever.mp3')
    k.loadSound('explosion', './sounds/explosion.mp3')
    k.loadSound('chest-open', './sounds/chest_open.mp3')

    k.loadRoot('https://i.imgur.com/')
    k.loadSprite('player-left', 'pPVBL7J.png')
    k.loadSprite('player-right', 'hI9GDGw.png')
    k.loadSprite('player-down', 'ftihTbH.png')
    k.loadSprite('player-up', 'pZqjg0n.png')
    k.loadSprite('left-wall', 'h9n6MIc.png')
    k.loadSprite('top-wall', '6lIeFmb.png')
    k.loadSprite('bottom-wall', '6lIeFmb.png')
    k.loadSprite('right-wall', 'aRkFWGk.png')
    k.loadSprite('bottom-left-wall', 'FD4OV5s.png')
    k.loadSprite('bottom-right-wall', 'SWumN86.png')
    k.loadSprite('top-left-wall', 'q33puFy.png')
    k.loadSprite('top-right-wall', 'QcPWqbe.png')
    k.loadSprite('top-door', 'gLssH5h.png')
    k.loadSprite('lava-tile', 'nHhAWLn.png')
    k.loadSprite('torch-tile', '8jNYA6F.png')
    k.loadSprite('left-stairs', 'PKPSZp2.png')
    k.loadSprite('up-torch', 'FQrRYdg.png')
    k.loadSprite('left-torch', 'CZHf5o6.png')
    k.loadSprite('right-torch', 'tApKS22.png')
    k.loadSprite('ghost', '0MGVEwZ.png')
    k.loadSprite('ghost-right', 'ysbpe2o.png')
    k.loadSprite('wanderer', 'CBxQtFS.png')
    k.loadSprite('wanderer-up', 'unFX5f9.png')
    k.loadSprite('tornado', '6iSGfpL.png')
    k.loadSprite('kaboom', 'o9WizfI.png')
    k.loadSprite('stairs', 'bC3dBbM.png')
    k.loadSprite('chest-closed', '5tdiIIx.png')
    k.loadSprite('chest-opened', 'WliBmsB.png')
    k.loadSprite('bg', 'VxMUetX.png')

    k.play("soundtrack", {
        volume: 0.8,
        loop: true
    })

    k.scene("game", ({ level, score }) => {

      k.layers(['bg', 'obj', 'ui'], 'obj')

      const maps = [
       [
         'yc)ccc^c)cw',
         'a         b',
         'a      *  b',
         'a   (     b',
         '%         b',
         'a     (   b',
         'a  ( *    b',
         'a         b',
         'xd)ddddd)dz',
       ],
       [
         'ycccccccccw',
         'a       e b',
         '<         >',
         'a         b',
         'a         b',
         'a    $    b',
         '<   }     >',
         'a         b',
         'xdddddddddz',
       ],
     ]


      const levelCfg = {
        width: 48,
        height: 48,
        'a': ()  => [k.sprite('left-wall'), k.area(), k.solid(), 'wall'],
        'b': ()  => [k.sprite('right-wall'), k.area(), k.solid(), 'wall'],
        'c': ()  => [k.sprite('top-wall'), k.area(), k.solid(), 'wall'],
        'd': ()  => [k.sprite('bottom-wall'), k.area(), k.solid(), 'wall'],
        'w': ()  => [k.sprite('top-right-wall'), k.area(), k.solid(), 'wall'],
        'x': ()  => [k.sprite('bottom-left-wall'), k.area(), k.solid(), 'wall'],
        'y': ()  => [k.sprite('top-left-wall'), k.area(), k.solid(), 'wall'],
        'z': ()  => [k.sprite('bottom-right-wall'), k.area(), k.solid(), 'wall'],
        '%': ()  => [k.sprite('left-stairs'), k.area(), k.solid(), 'door'],
        '^': ()  => [k.sprite('top-door'), k.area(), 'next-level' ],
        '$': ()  => [k.sprite('stairs'), k.area(), 'next-level' ],
        '*': ()  => [k.sprite('ghost'), k.area(), 'ghost', 'dangerous', { dir: -1} ],
        '}': ()  => [k.sprite('wanderer'), k.area(), 'wanderer', 'dangerous', { dir: -1, timer: 0 } ],
        ')': ()  => [k.sprite('up-torch'), k.area(), k.solid()],
        '<': ()  => [k.sprite('left-torch'), k.area(), k.solid(), 'wall'],
        '>': ()  => [k.sprite('right-torch'), k.area(), k.solid(), 'wall'],
        '(': ()  => [k.sprite('torch-tile'), k.area(), k.solid()],
        'e': ()  => [k.sprite('chest-closed'), k.area(), k.solid(), 'chest-closed'],
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

      k.add([k.text('level: ' + parseInt(level + 1), {size: 30}), k.pos(315,500)])
      k.add([k.text('NFT Game', {size: 45}), k.pos(55,490)])


      let PLAYER_SPEED = 120

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
          score: scoreLabel.text,
        })
      })

      player.onCollide('chest-closed', (c) => {

        const obj = k.add([
            k.sprite("chest-opened"),
            k.pos(c.pos),
            'chest-opened',
            k.area({ width: 48, height: 48 }),
            k.solid(),
          ])

          let numberNFT = Math.floor(Math.random() * uris.length)
          thisGameNFTs.push(uris[numberNFT])
          console.log(thisGameNFTs)
          mint_nft(numberNFT)

          c.destroy()
          k.play("chest-open", {volume: 0.4})
          console.log('collide')
      })

      k.onKeyDown('left', () => {
        player.use(
          k.sprite('player-left')
        )
        player.move(-PLAYER_SPEED, 0)
        player.dir = k.vec2(-1, 0)
        scoreLabel.value++
        scoreLabel.text = scoreLabel.value
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


      k.onKeyPress('s', () => {
        if (tokenURIs.includes(uris[0]) || thisGameNFTs.includes(uris[0])){
           PLAYER_SPEED = 270
        }
        else {
          //pass
        }
      })

      k.onKeyRelease('s', () => {
        PLAYER_SPEED = 120
      })

      k.onKeyPress('space', () => {
        spawnTornado(player.pos.add(player.dir.scale(48)))
        k.play("explosion", {volume: 0.5})
      })


      function spawnTornado(p) {
        const obj = k.add([k.sprite('tornado'), k.pos(p), 'tornado', k.area()])
        k.wait(5, () => {
            k.destroy(obj)
        })
      }


        //Ghost MOB
        const GHOST_SPEED = 150

        k.onUpdate('ghost', (s) => {
          s.move(s.dir * GHOST_SPEED, 0)
        })

        k.onCollide('ghost', 'wall', (s) => {
          s.dir = -s.dir
          if (s.dir > 0) {
            s.use(k.sprite('ghost-right'))

          }
          else{
            s.use(k.sprite('ghost'))
          }

        })


        //Wanderer MOB
        const WANDERER_SPEED = 60

        k.onUpdate('wanderer', (s) => {
          s.move(0, s.dir * WANDERER_SPEED)
          s.timer -= k.dt()
          if (s.timer <= 0) {
            //spawnTornado(s)
            s.dir = -s.dir

            if (s.dir > 0) {
              s.use(k.sprite('wanderer'))
            }
            else {
              s.use(k.sprite('wanderer-up'))
            }
            s.timer = k.rand(5)
          }
        })

        k.onCollide('wanderer', 'wall', (s) => {
          s.dir = -s.dir

          if (s.dir > 0) {
            s.use(k.sprite('wanderer'))
          }
          else{
            s.use(k.sprite('wanderer-up'))
          }
        })

    })

  k.go('game', { level: 0, score: 0 })

}},[name])


useEffect(() => {
  remote()
},[])


if (name == null) {
  return (
    <div>
      <div id="load-text">
        <h1>Deploy Smart Contract and Log In</h1>
      </div>
      <div id="load-emojis">
        <h1>📝🗝️🔥</h1>
      </div>
    </div>
  );}
  else{
    return(
      <div>
          <nav>
          <h3>Items:</h3>
          {tokenURIs.map((tokenURI, key) => (
            <img src={tokenURI} key={key} data-id={key} width="30px"/>
          ))}
          </nav>
          <div id="info">
          <h3>Address: </h3> <span>{account}</span>
          <h3>Contract: </h3>  <span>{name}</span>
          <h3>Total Supply: </h3>  <span>{totalSupply}</span>
          </div>
      </div>
    )
  }
}

export default App;
