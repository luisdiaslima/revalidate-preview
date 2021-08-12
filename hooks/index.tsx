import React from 'react'

import { WishListProvider } from './wishList'

const AppProvider: React.FC = ({ children }) => <WishListProvider>{children}</WishListProvider>

export default AppProvider