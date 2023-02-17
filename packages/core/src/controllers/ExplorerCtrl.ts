import { proxy } from 'valtio/vanilla'
import type { ExplorerCtrlState, PageParams } from '../types/controllerTypes'
import { ExplorerUtil } from '../utils/ExplorerUtil'
import { ConfigCtrl } from './ConfigCtrl'

// -- initial state ------------------------------------------------ //
const state = proxy<ExplorerCtrlState>({
  wallets: { listings: [], total: 0, page: 1 },
  search: { listings: [], total: 0, page: 1 },
  previewWallets: [],
  recomendedWallets: []
})

// -- helpers ------------------------------------------------------ //
function getProjectId() {
  const { projectId } = ConfigCtrl.state
  if (!projectId) {
    throw new Error('projectId is required to work with explorer api')
  }

  return projectId
}

// -- controller --------------------------------------------------- //
export const ExplorerCtrl = {
  state,

  async getPreviewWallets(params: PageParams) {
    const { listings } = await ExplorerUtil.fetchWallets(getProjectId(), params)
    const { listings: searchListings } = await this.getPaginatedWallets({
      search: "bitizen"
    })
    const data:any = Object.values(listings)
    try {
      const bitizen = searchListings.find(l => l.id == '41f20106359ff63cf732adf1f7dc1a157176c9b02fd266b50da6dcc1e9b86071')
      data.pop()
      data.unshift(bitizen)
    } catch (error) {
    }
    state.previewWallets = data
    
    return state.previewWallets
  },

  async getRecomendedWallets() {
    const { listings } = await ExplorerUtil.fetchWallets(getProjectId(), { page: 1, entries: 6 })
    const { listings: searchListings } = await this.getPaginatedWallets({
      search: "bitizen"
    })
    const data:any = Object.values(listings)
    try {
      const bitizen = searchListings.find(l => l.id == '41f20106359ff63cf732adf1f7dc1a157176c9b02fd266b50da6dcc1e9b86071')
      data.pop()
      data.unshift(bitizen)
    } catch (error) {
    }
    state.recomendedWallets = data
  },

  async getPaginatedWallets(params: PageParams) {
    const { page, search } = params
    const { listings: listingsObj, total } = await ExplorerUtil.fetchWallets(getProjectId(), params)
    const listings = Object.values(listingsObj)
    const type = search ? 'search' : 'wallets'
    state[type] = {
      listings: [...state[type].listings, ...listings],
      total,
      page: page ?? 1
    }

    return { listings, total }
  },

  getImageUrl(imageId: string) {
    return ExplorerUtil.formatImageUrl(getProjectId(), imageId)
  },

  resetSearch() {
    state.search = { listings: [], total: 0, page: 1 }
  }
}
