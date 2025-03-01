import { Web3Modal } from '@bitizenwallet/web3modal-html'
import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi'
import { configureChains, createClient } from '@wagmi/core'
import { arbitrum, avalanche, mainnet, polygon } from '@wagmi/core/chains'
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'

// 1. Define constants
const projectId = '8e6b5ffdcbc9794bf9f4a1952578365b'
const chains = [mainnet, polygon, avalanche, arbitrum]

// 2. Configure wagmi client
const { provider } = configureChains(chains, [walletConnectProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: [...modalConnectors({ appName: 'web3Modal', chains }), new SafeConnector({ chains })],
  provider
})

// 3. Create ethereum and modal clients
const ethereumClient = new EthereumClient(wagmiClient, chains)
export const web3Modal = new Web3Modal(
  {
    projectId,
    walletImages: {
      safe: 'https://pbs.twimg.com/profile_images/1566773491764023297/IvmCdGnM_400x400.jpg'
    }
  },
  ethereumClient
)
