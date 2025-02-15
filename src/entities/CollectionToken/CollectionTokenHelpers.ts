import { TokenKinds } from '@airswap/constants';
import { getCollectionTokenInfo } from '@airswap/metadata';
import { CollectionTokenInfo } from '@airswap/types';
import erc721AbiContract from '@openzeppelin/contracts/build/contracts/ERC721.json';
import erc721AbiEnumerableContract from '@openzeppelin/contracts/build/contracts/ERC721Enumerable.json';
import erc1155AbiContract from '@openzeppelin/contracts/build/contracts/ERC1155.json';
import * as ethers from 'ethers';

export const getCollectionToken = async (library: ethers.providers.BaseProvider, address: string, tokenId: number): Promise<CollectionTokenInfo | undefined> => {
  let tokenInfo: CollectionTokenInfo;

  try {
    tokenInfo = await getCollectionTokenInfo(library, address, tokenId.toString());
  } catch (e) {
    console.error(new Error(`Unable to fetch data for ${address} with id ${tokenId}`));

    return undefined;
  }

  return tokenInfo;
};

export const getCollectionTokenContractAbi = (kind: CollectionTokenInfo['kind']): ethers.ContractInterface => {
  if (kind === TokenKinds.ERC721) {
    return erc721AbiContract.abi;
  }

  if (kind === TokenKinds.ERC1155) {
    return erc1155AbiContract.abi;
  }

  return erc721AbiEnumerableContract.abi;
};

export const getCollectionTokenOwner = async (library: ethers.providers.BaseProvider, token: CollectionTokenInfo): Promise<string | undefined> => {
  const contractAbi = getCollectionTokenContractAbi(token.kind);
  const contract = new ethers.Contract(token.address, contractAbi, library);

  return contract.functions.ownerOf(token.id)
    .then((owner: [string]) => owner[0])
    .catch(() => undefined);
};

export const isCollectionTokenInfo = (resource: any): resource is CollectionTokenInfo => (
  resource
    && typeof resource.chainId === 'number'
    && typeof resource.kind === 'string'
    && typeof resource.address === 'string'
    && typeof resource.id === 'number'
    && typeof resource.uri === 'string'
    && resource.attributes && Array.isArray(resource.attributes)
);

export const filterCollectionTokenBySearchValue = (token: CollectionTokenInfo, value: string): boolean => {
  if (value === '') return true;

  if (token.name && token.name.toLowerCase().includes(value.toLowerCase())) return true;

  return token.id.toString().toLowerCase().includes(value.toLowerCase());
};
