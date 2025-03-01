import { Web3Button, Web3NetworkSwitch } from '@bitizenwallet/web3modal-react'
import { Button, Card, Divider, Modal, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'

const message = 'Hello Web3Modal!'

export default function WagmiWeb3ModalWidget() {
  const { isConnected } = useAccount()
  const height = isConnected ? '230px' : '140px'
  const { data, isLoading, signMessage } = useSignMessage({ message })
  const [modalOpen, setModalOpen] = useState(false)

  function getData() {
    if (typeof data === 'object') {
      return JSON.stringify(data)
    }

    return String(data)
  }

  useEffect(() => {
    if (isLoading) {
      setModalOpen(true)
    }
  }, [isLoading])

  return (
    <>
      <Card css={{ maxWidth: '400px', margin: '100px auto' }} variant="bordered">
        <Card.Body css={{ justifyContent: 'space-between', alignItems: 'center', height }}>
          <Web3Button balance="show" />
          <Web3NetworkSwitch />

          {isConnected ? (
            <>
              <Divider />
              <Button color="gradient" onClick={() => signMessage()}>
                Sign Message
              </Button>
            </>
          ) : null}
        </Card.Body>
      </Card>

      <Modal closeButton blur open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>
          <Text h3>Sign Message</Text>
        </Modal.Header>
        <Modal.Body>
          <Text h4>Message</Text>
          <Text color="grey">{message}</Text>

          <Text h4>Signature</Text>
          <Text color="grey" css={{ wordWrap: 'break-word' }}>
            {/* eslint-disable-next-line no-nested-ternary */}
            {isLoading ? 'Waiting...' : getData()}
          </Text>
        </Modal.Body>
      </Modal>
    </>
  )
}
