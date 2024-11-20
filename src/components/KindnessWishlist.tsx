import React, { useState } from 'react';

const KindnessWishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<string>('');
  const [savedWishlist, setSavedWishlist] = useState<string | null>(null);

  const handleSave = () => {
    setSavedWishlist(wishlist);
    alert('Your wishlist has been saved! 🎉');
  };

  return (
    <div id="notebook-paper">
      <header>
        <h1>Kindness Wishlist</h1>
      </header>
      <div id="content">
        {!savedWishlist ? (
          <>
            <textarea
              value={wishlist}
              onChange={(e) => setWishlist(e.target.value)}
              placeholder="Write down your kindness goals and ideas here..."
            />
            <button onClick={handleSave}>Save Wishlist</button>
          </>
        ) : (
          <>
            <p>{savedWishlist}</p>
            <button onClick={() => setSavedWishlist(null)}>Edit Wishlist</button>
          </>
        )}
      </div>
    </div>
  );
};

export default KindnessWishlist;
