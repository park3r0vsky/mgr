
import {useEffect, useState} from 'react'
import * as React from "react"
import './App.css'
import kaboom from "kaboom"
import Web3 from "web3/dist/web3.min.js";
import ItemToken from './abis/ItemToken.json'


const App = () => {

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
      setName(name)


      let balanceOf = await token.methods.balanceOf(accounts[0]).call()
      for (let i = 0; i < balanceOf; i++) {
        let id = await token.methods.tokenOfOwnerByIndex(accounts[0], i).call()
        let tokenURI = await token.methods.tokenURI(id).call()

        setTokenURIs(tokenURIs => [...tokenURIs,tokenURI])
      }

    }
    else{
          alert('Smart contract not deployed to network')
    }

    }

    const remote = async () => {
      await loadWeb3()
      await loadBlockchainData()
    }


  useEffect(() => {

    remote()

    if (account != null && name != null) {

    const k = kaboom({
      global: true,
      width: 600,
      height: 600,
      scale: 1,
      debug: true,
      //background: [0, 0, 0, 1],
    })
    const MOVE_SPEED = 120

    k.loadRoot('https://i.imgur.com/')
    k.loadSprite('link-going-left', '1Xq9biB.png')
    k.loadSprite('link-going-right', 'yZIb8O2.png')
    k.loadSprite('link-going-down', 'tVtlP6y.png')
    k.loadSprite('link-going-up', 'UkV0we0.png')
    k.loadSprite('left-wall', 'rfDoaa1.png')
    k.loadSprite('top-wall', 'QA257Bj.png')
    k.loadSprite('bottom-wall', 'vWJWmvb.png')
    k.loadSprite('right-wall', 'SmHhgUn.png')
    k.loadSprite('bottom-left-wall', 'awnTfNC.png')
    k.loadSprite('bottom-right-wall', '84oyTFy.png')
    k.loadSprite('top-left-wall', 'xlpUxIm.png')
    k.loadSprite('top-right-wall', 'z0OmBd1.jpg')
    k.loadSprite('top-door', 'U9nre4n.png')
    k.loadSprite('fire-pot', 'I7xSp7w.png')
    k.loadSprite('left-door', 'okdJNls.png')
    k.loadSprite('lanterns', 'wiSiY09.png')
    k.loadSprite('slicer', 'c6JFi5Z.png')
    k.loadSprite('skeletor', 'Ei1VnX8.png')
    k.loadSprite('kaboom', 'o9WizfI.png')
    k.loadSprite('stairs', 'VghkL08.png')
    k.loadSprite('bg', 'u4DVsx6.png')

    k.scene("game", ({ level, score }) => {

      k.layers(['bg', 'obj', 'ui'], 'obj')

      const maps = [
       [
         'ycc)cc^ccw',
         'a        b',
         'a      * b',
         'a    (   b',
         '%        b',
         'a    (   b',
         'a   *    b',
         'a        b',
         'xdd)dd)ddz',
       ],
       [
         'yccccccccw',
         'a        b',
         ')        )',
         'a        b',
         'a        b',
         'a    $   b',
         ')   }    )',
         'a        b',
         'xddddddddz',
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
        '%': ()  => [k.sprite('left-door'), k.area(), k.solid(), 'door'],
        '^': ()  => [k.sprite('top-door'), k.area(), 'next-level' ],
        '$': ()  => [k.sprite('stairs'), k.area(), 'next-level' ],
        '*': ()  => [k.sprite('slicer'), k.area(), 'slicer', 'dangerous', { dir: -1} ],
        '}': ()  => [k.sprite('skeletor'), k.area(), 'skeletor', 'dangerous', { dir: -1, timer: 0 } ],
        ')': ()  => [k.sprite('lanterns'), k.area(), k.solid()],
        '(': ()  => [k.sprite('fire-pot'), k.area(), k.solid()],


      }
      k.addLevel(maps[level], levelCfg)

      k.add([k.sprite('bg'), k.layer('bg')])

      const scoreLabel = k.add([
        k.text(score),
        k.pos(400,450),
        k.layer('ui'),
        {
          value: score,
        },
      ])

      k.add([k.text('level ' + parseInt(level + 1)), k.pos(400,525)])

      const player = k.add([
        k.sprite('link-going-right'),
        k.pos(5, 190),
        k.area({ width: 46, height: 46 }),
        k.solid(),
        {
          dir: k.vec2(1,0),    //right by default
        }
      ])

      player.onCollide('next-level', () =>{
        console.log(account)
        console.log(name)
        console.log(totalSupply)
        setCount(prevCount => prevCount + 1)
        console.log(count)
        token.methods.mint(
          account,
          'https://golden-storage-production.s3.amazonaws.com/topic_images/6861ca1121e24652a45644fc1a29f546.png'
        )
        .send({ from: account })
        .on('transactionHash', (hash) => {

          setTokenURIs(tokenURIs => [...tokenURIs, 'https://golden-storage-production.s3.amazonaws.com/topic_images/6861ca1121e24652a45644fc1a29f546.png'])
        })


      k.go("game", {
        level: (level +1) % maps.length,
        score: scoreLabel.text,
      })


      })

      k.onKeyDown('left', () => {
        player.use(
          k.sprite('link-going-left')
        )
        player.move(-MOVE_SPEED, 0)
        player.dir = k.vec2(-1, 0)
        scoreLabel.value++
        scoreLabel.text = scoreLabel.value
      })
      k.onKeyDown('right', () => {
        player.use(
          k.sprite('link-going-right')
        )
        player.move(MOVE_SPEED, 0)
        player.dir = k.vec2(1, 0)
      })
      k.onKeyDown('up', () => {
        player.use(
          k.sprite('link-going-up')
        )
        player.move(0, -MOVE_SPEED)
        player.dir = k.vec2(0,-1)
      })
      k.onKeyDown('down', () => {
        player.use(
          k.sprite('link-going-down')
        )
        player.move(0, MOVE_SPEED)
        player.dir = k.vec2(0, 1)
      })


    })


  k.go('game', { level: 0, score: 0 })

}

},[account, name])





  return (
    <div>

      <div>
      {tokenURIs.map((tokenURI, key) => (
        <img src={tokenURI} key={key} data-id={key} width="40px"/>
      ))}

      {tokenURIs.length}
        {account} {name} {totalSupply}
      </div>


    </div>
  );
}

export default App;
