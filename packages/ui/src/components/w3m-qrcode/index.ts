import { ConfigCtrl } from '@bitizenwallet/web3modal-core'
import { html, LitElement, svg } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { QrCodeUtil } from '../../utils/QrCode'
import { SvgUtil } from '../../utils/SvgUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('w3m-qrcode')
export default class W3mQrCode extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- state & properties ------------------------------------------- //
  @property() public uri = ''
  @property({ type: Number }) public size = 0
  @property() public logoSrc? = ''
  @property() public walletId? = ''

  // -- private ------------------------------------------------------ //
  private svgTemplate() {
    const themeMode = ConfigCtrl.state.themeMode ?? 'light'

    return svg`
      <svg height=${this.size} width=${this.size}>
        ${QrCodeUtil.generate(this.uri, this.size, this.size / 4, themeMode)}
      </svg>
    `
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div>
        ${this.walletId || this.logoSrc
          ? html`
              <w3m-wallet-image
                walletId=${ifDefined(this.walletId)}
                src=${ifDefined(this.logoSrc)}
              ></w3m-wallet-image>
            `
          : SvgUtil.WALLET_CONNECT_ICON_COLORED}
        ${this.svgTemplate()}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-qrcode': W3mQrCode
  }
}
