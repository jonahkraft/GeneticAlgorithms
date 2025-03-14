import React from 'react';
import { Subtract } from 'utility-types';
import CallBack from './CallBack';

export interface InjectedCounterProps {
  onChange(): void;
  open: boolean;
  text: string[];
  callBack: CallBack;
}

interface MakeDropDownProps {
  text?: string[];
  callBack: CallBack;
}

interface MakeCounterState {
  open: boolean;
}

const makeDropDown = <P extends InjectedCounterProps>(
  Component: React.ComponentType<P>
) => class MakeCounter extends React.Component<
  Subtract<P, InjectedCounterProps> & MakeDropDownProps,
  MakeCounterState
> {
    state: MakeCounterState = {
      open: false,
    };

    change = () => {
      this.setState(prevState => ({
        open: !prevState.open
      }))
      console.log("DD clicked", this.state.open)
    }

    render() {
      const { text, callBack, ...props } = this.props;
      console.log(typeof callBack)
      console.log(callBack)
      return (
        <Component
          {...props as P}
          text={text}
          callBack={callBack}
          open={this.state.open}
          onChange={this.change}
        />
      );
    }
  };

export default makeDropDown;