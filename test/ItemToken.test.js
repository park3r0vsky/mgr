const ItemToken = artifacts.require('./ItemToken.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Item Token', (accounts) => {
  let token

  before(async () => {
    token = await ItemToken.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async() => {
      const address = token.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await token.name()
      assert.equal(name, 'Item Token')
    })

    it ('has a symbol', async () => {
      const symbol = await token.symbol()
      assert.equal(symbol, 'ITEM')
    })
  })

  describe('token distribution', async () => {
    let result

    it('mints tokens', async () => {
      await token.mint(accounts[0], 'https://www.random-nft.net/uri')

      result = await token.totalSupply()
      assert.equal(result.toString(), '1', 'total supply is correct')

      result = await token.balanceOf(accounts[0])
      assert.equal(result.toString(), '1', 'balanceOf is correct')

      result = await token.ownerOf('1')
      assert.equal(result.toString(), accounts[0].toString(), 'ownerOf is correct')
      result = await token.tokenOfOwnerByIndex(accounts[0], 0)

      let balanceOf = await token.balanceOf(accounts[0])
      let tokenIds = []
      for (let i = 0; i < balanceOf; i++) {
        let id = await token.tokenOfOwnerByIndex(accounts[0], i)
        tokenIds.push(id.toString())
      }
      let expected = ['1']
      assert.equal(tokenIds.toString(), expected.toString(), 'tokenIds are correct')

      let tokenURI = await token.tokenURI('1')
      assert.equal(tokenURI, 'https://www.random-nft.net/uri')

    })
  })

  describe('token transfer', async () => {
    //await token.mint(accounts[0], 'https://www.random-nft.net/uri')

    it('transfer tokens', async () => {
    await token.transferFrom(accounts[0], accounts[1], 1)

    let ownerOfTokenOne = await token.ownerOf(1)

    assert.equal(ownerOfTokenOne.toString(), accounts[1].toString(), 'new owner is correct')
    assert.notEqual(ownerOfTokenOne.toString(), accounts[0].toString(), 'old owner doesnt have a token')

  })
  })

  describe('upgrade tokens', async () => {

    it('upgrade tokens', async () => {
    await token.mint(accounts[0], 'https://www.random1-nft.net/uri')
    await token.mint(accounts[0], 'https://www.random2-nft.net/uri')
    await token.transferToDeadAddress(accounts[0], 2, 3, 'https://i.imgur.com/eU4Ww4q.png')

    let ownerOfTokenTwo = await token.ownerOf(2)
    let ownerOfTokenThree = await token.ownerOf(3)
    let ownerOfTokenFour = await token.ownerOf(4)
    assert.equal(ownerOfTokenTwo.toString(), '0x000000000000000000000000000000000000dEaD', 'token 2 on dead address')
    assert.equal(ownerOfTokenThree.toString(), '0x000000000000000000000000000000000000dEaD', 'token 3 on dead address')
    assert.equal(ownerOfTokenFour.toString(), accounts[0].toString(), 'upgraded token on good address')


    let tokenFourURI = await token.tokenURI('4')
    assert.notEqual(ownerOfTokenTwo.toString(), accounts[0].toString(), 'token 2 on dead address')
    assert.equal(tokenFourURI.toString(), 'https://i.imgur.com/qALgI5Z.png', 'upgraded token URI correct')

  })
  })

})
