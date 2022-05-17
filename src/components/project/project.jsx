import React, { useEffect, useState } from 'react';
import { ActionButton } from '../ActionButton/ActionButton';
import styles from './project.module.scss'

const re = /[0-9A-Fa-f]{4}/g;

// ze stackoverflow
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

export const Project = () => {
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    ax: '',
    bx: '',
    cx: '',
    dx: ''
  })
  const [register, setRegister] = useState({
    ax: 1,
    bx: 2,
    cx: 3,
    dx: 4
  })


  const handleClickActionButton = (from, to, change) => {
    if (change) {
      setRegister(prev => ({
        ...prev,
        [to]: prev[from],
        [from]: prev[to],
      }))
    } else {
      setRegister(prev => ({
        ...prev,
        [to]: prev[from]
      }))
    }
  }

  useEffect(() => {
    randomize();
  }, []);

  const randomize = () => {
    const newRandValues = {
      ax: genRanHex(4),
      bx: genRanHex(4),
      cx: genRanHex(4),
      dx: genRanHex(4),
    }

    setRegister(newRandValues);
  }

  const reset = () => {
    setRegister({
      ax: '',
      bx: '',
      cx: '',
      dx: '',
    });
  }  

  const handleFormChange = (value, key) => {
    if (value.length === 4) {
      if (re.test(value)) {
        setRegister(prev => ({
          ...prev,
          [key]: value,
        }));

        setError(false)
      } else {
        setError(true)
      }
      setForm(prev => ({
        ...prev,
        [key]: ''
      }))
    }

    if (value.length < 4) {
      setForm(prev => ({
        ...prev,
        [key]: value
      }))
    }
  }

  return (
    <>
      <div className={styles.left}>
        <div className={styles.leftButtons}>
          <button onClick={reset}>
            reset
          </button>
          <button onClick={randomize}>
            randommmm
          </button>
        </div>
        <div className={styles.leftRegisters}>
          <div className={styles.leftRegisterContainer}>
            AX 
            <input type="text" disabled value={register.ax}>
            </input>
            <input type="text" value={form.ax} onChange={e => handleFormChange(e.target.value, 'ax')}>
            </input>
          </div>
          <div className={styles.leftRegisterContainer}>
            BX 
            <input type="text" disabled value={register.bx}>
            </input>
            <input type="text" value={form.bx} onChange={e => handleFormChange(e.target.value, 'bx')}>
            </input>
          </div>
          <div className={styles.leftRegisterContainer}>
            CX 
            <input type="text" disabled value={register.cx}>
            </input>
            <input type="text" value={form.cx} onChange={e => handleFormChange(e.target.value, 'cx')}>
            </input>
          </div>
          <div className={styles.leftRegisterContainer}>
            DX 
            <input type="text" disabled value={register.dx}>
            </input>
            <input type="text" value={form.dx} onChange={e => handleFormChange(e.target.value, 'dx')}>
            </input>
          </div>
        </div>
        <div className={styles.leftRegisterButtonsContainer}>
          <ActionButton from="ax" to="bx" handleClick={handleClickActionButton}/>
          <ActionButton isChange from="ax" to="bx" handleClick={handleClickActionButton}/>
        </div>
        {error && <p>Niepoprawna wartość pola</p>}
      </div>
    </>
  );
};