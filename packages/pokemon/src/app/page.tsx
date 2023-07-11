/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useState } from 'react'
import {
  Container,
  ContainerPokemon,
  LinkGeneration,
  ContainerLink,
  CardTypePokemon
} from './styles'
import { usePokemon } from '../hooks/pokemon'
import Modal from '@/components/modal'
import Tooltip from '@/components/Tooltip'
import { useSocket } from '@/context/socket'
import { MdOutlineMoreVert } from 'react-icons/md'

function Home() {
  const { listPokemon, isLoading, generation } = usePokemon()
  const { socketClient } = useSocket()
  const [showModal, setShowModal] = useState(
    {} as { open: boolean; img: string; name: string }
  )

  return (
    <>
      <ContainerLink>
        {[...Array(9)].map((_, i) => (
          <LinkGeneration
            $ispage={i + 1 === generation}
            href={`/?generation=${i + 1}`}
            key={i + 1}
          >
            Geração {i + 1}
          </LinkGeneration>
        ))}
      </ContainerLink>
      <Container>
        {isLoading
          ? [...Array(20)].map((_, i) => (
              <ContainerPokemon key={i} className="skeleton" />
            ))
          : listPokemon?.map(item => (
              <ContainerPokemon key={item.id}>
                <Tooltip message={item.name}>
                  <p>
                    {item.id} - {item.name}
                  </p>
                </Tooltip>
                <img
                  alt={item.name}
                  src={item.img}
                  onClick={() =>
                    setShowModal({ open: true, img: item.img, name: item.name })
                  }
                  style={{ height: '80px', width: '80px', marginBottom: '8px' }}
                />
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
                >
                  {item.types.map(item => (
                    <CardTypePokemon $type={item} key={item}>
                      {item}
                    </CardTypePokemon>
                  ))}
                </div>
                <MdOutlineMoreVert
                  onClick={() => {
                    socketClient?.emit('addPokemon', item.id)
                  }}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '8px'
                  }}
                />
              </ContainerPokemon>
            ))}
        <Modal
          modal={showModal.open}
          closeModal={() => setShowModal({ open: false, img: '', name: '' })}
        >
          <img
            style={{ width: '160px' }}
            alt={showModal.name}
            src={showModal.img}
          />
        </Modal>
      </Container>
    </>
  )
}

export default Home
