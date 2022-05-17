import React, { useEffect, useState } from 'react';
import { ActionButton } from '../ActionButton/ActionButton';
import styles from './project.module.scss';

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


  const zmiana2 = (from, to, change) => {
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

  const zmiana = (value, key) => {
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
      <div className={styles.lewy}>
        <div className={styles.lewyreg}>
          <h1>Emulator procesora 8086</h1>
          <div className={styles.lewyregc}>
            
            AX 
            <input type="text" disabled value={register.ax}>
            </input>
            <input type="text" value={form.ax} onChange={e => zmiana(e.target.value, 'ax')}>
            </input>
          </div>
          <div className={styles.lewyregc}>
            BX 
            <input type="text" disabled value={register.bx}>
            </input>
            <input type="text" value={form.bx} onChange={e => zmiana(e.target.value, 'bx')}>
            </input>
          </div>
          <div className={styles.lewyregc}>
            CX
            <input type="text" disabled value={register.cx}>
            </input>
            <input type="text" value={form.cx} onChange={e => zmiana(e.target.value, 'cx')}>
            </input>
          </div>
          <div className={styles.lewyregc}>
            DX 
            <input type="text" disabled value={register.dx}>
            </input>
            <input type="text" value={form.dx} onChange={e => zmiana(e.target.value, 'dx')}>
            </input>
          </div>
        </div>
        <div className={styles.lewyglowny}>
        <button onClick={reset}>
            reset
          </button>
          <button onClick={randomize}>
            random
          </button>
          <ActionButton from="ax" to="bx" handleClick={zmiana2}/>
          <ActionButton isChange from="ax" to="bx" handleClick={zmiana2}/>
          <ActionButton from="ax" to="cx" handleClick={zmiana2}/>
          <ActionButton isChange from="ax" to="cx" handleClick={zmiana2}/>
          <ActionButton from="ax" to="dx" handleClick={zmiana2}/>
          <ActionButton isChange from="dx" to="dx" handleClick={zmiana2}/>

          <ActionButton from="bx" to="ax" handleClick={zmiana2}/>
          <ActionButton isChange from="bx" to="dx" handleClick={zmiana2}/>
          <ActionButton from="bx" to="dx" handleClick={zmiana2}/>
          
          
          <ActionButton isChange from="cx" to="dx" handleClick={zmiana2}/>
          <ActionButton from="cx" to="ax" handleClick={zmiana2}/>
          
          <ActionButton isChange from="bx" to="cx" handleClick={zmiana2}/>
          
          <ActionButton from="cx" to="bx" handleClick={zmiana2}/>
          <ActionButton from="cx" to="dx" handleClick={zmiana2}/>
          

          <ActionButton from="dx" to="ax" handleClick={zmiana2}/>
          <ActionButton from="bx" to="cx" handleClick={zmiana2}/>
          <ActionButton from="dx" to="bx" handleClick={zmiana2}/>
          <ActionButton from="dx" to="cx" handleClick={zmiana2}/>


        </div>
        {error && <p>Podana wartość nie spełnia wymagań.</p>}
      </div>
    </>
  );
};