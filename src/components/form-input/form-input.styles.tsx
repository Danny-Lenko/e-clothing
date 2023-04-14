import styled, { css } from "styled-components";

const mainColor = 'black'
const subColor = 'grey'

const shrinkCssStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`

export const Container = styled.div`
  position: relative;
  margin: 45px 0;

  input[type='password'] {
    letter-spacing: 0.3em;
  }
`

interface Props {
  shrink: boolean;
}

export const Label = styled.label<Props>`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
  ${({shrink}) => shrink && shrinkCssStyles}
`

export const Input = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ ${Label} {
    ${shrinkCssStyles}
  }
`


