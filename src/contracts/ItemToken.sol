//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721URIStorage.sol';

contract ItemToken is ERC721, ERC721Enumerable, ERC721URIStorage {
    constructor() ERC721("Item Token", "ITEM") {
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }


    function mint(address _to, string memory _tokenURI) public returns(bool) {
      uint _tokenId = totalSupply() + 1;
      _mint(_to, _tokenId);
      _setTokenURI(_tokenId, _tokenURI);
      return true;
    }

    function transferToDeadAddress(address _from, uint256 _tokenIdOne, uint256 _tokenIdTwo, string memory _tokenURI) public returns(bool) {
      address dead = 0x000000000000000000000000000000000000dEaD;
      _transfer(_from, dead, _tokenIdOne);
      _transfer(_from, dead, _tokenIdTwo);

      if(ownerOf(_tokenIdOne) == dead && ownerOf(_tokenIdTwo) == dead){
        if (keccak256(abi.encodePacked(_tokenURI)) == keccak256("https://i.imgur.com/eU4Ww4q.png")){
          string memory _tokenURIupg = "https://i.imgur.com/qALgI5Z.png";
          mint(_from, _tokenURIupg);
        }
        else if (keccak256(abi.encodePacked(_tokenURI)) == keccak256("https://i.imgur.com/cA6vwIw.png")){
          string memory _tokenURIupg = "https://i.imgur.com/HuMtjDI.png";
          mint(_from, _tokenURIupg);
        }
        else if (keccak256(abi.encodePacked(_tokenURI)) == keccak256("https://i.imgur.com/AvupuK5.png")){
          string memory _tokenURIupg = "https://i.imgur.com/GI3Brn0.png";
          mint(_from, _tokenURIupg);
        }
        else if (keccak256(abi.encodePacked(_tokenURI)) == keccak256("https://i.imgur.com/NcPbCFQ.png")){
          string memory _tokenURIupg = "https://i.imgur.com/XsrdIG1.png";
          mint(_from, _tokenURIupg);
        }
        else if (keccak256(abi.encodePacked(_tokenURI)) == keccak256("https://i.imgur.com/aVviGzf.png")){
          string memory _tokenURIupg = "https://i.imgur.com/o6ntoZe.png";
          mint(_from, _tokenURIupg);
        }

      }
      return true;

    }
}
