'use client';
import { useState } from 'react';
import { MdOutlineMoreVert } from 'react-icons/md';

import Modal from '@/components/modal';
import Tooltip from '@/components/Tooltip';
import { useSocket } from '@/context/socket';

import { usePokemon } from '../hooks/pokemon';
import { Container, ContainerPokemon, CardTypePokemon } from './styles';

function Home() {
  const { listPokemon, isLoading } = usePokemon();
  const { socketClient } = useSocket();
  const [showModal, setShowModal] = useState({} as { open: boolean; img: string; name: string });

  return (
    <>
      <Container>
        {isLoading
          ? [...Array(20)].map((_, i) => <ContainerPokemon key={i} className='skeleton' />)
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
                  onClick={() => setShowModal({ open: true, img: item.img, name: item.name })}
                  style={{ height: '80px', width: '80px', marginBottom: '8px' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {item.types.map(item => (
                    <CardTypePokemon $type={item} key={item}>
                      {item}
                    </CardTypePokemon>
                  ))}
                </div>
                <MdOutlineMoreVert
                  onClick={() => {
                    socketClient?.emit('addPokemon', item.id);
                  }}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '8px'
                  }}
                />
              </ContainerPokemon>
          ))}
        <Modal modal={showModal.open} closeModal={() => setShowModal({ open: false, img: '', name: '' })}>
          <img style={{ width: '160px' }} alt={showModal.name} src={showModal.img} />
        </Modal>
      </Container>
    </>
  );
}

export default Home;
