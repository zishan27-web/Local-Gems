'use client'

import GemCard from "@/components/GemCard";
import NewGemForm from "@/components/NewGemForm";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";

// const initialGems = [
//   { _id: 1, name: "Chai Wala Corner", description: "Best masala chai in the city, hidden in a back alley.", submittedBy: "Admin" },
//   { _id: 2, name: "Quiet Reading Park", description: "A small, peaceful park with great benches for reading.", submittedBy: "Admin" },
//   { _id: 3, name: "The Old Bookstore", description: "Sells rare, second-hand books you can't find anywhere else.", submittedBy: "Admin" },
// ];

export default function GemsClientPage() {
  const { data: session } = useSession();
  // console.log(session);

  const [gems, setGems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedGem, setSelectedGem] = useState(null);
  const searchParams = useSearchParams();
//   const [isCopied, setIsCopied] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const loginSuccess = searchParams.get('login');
    if (loginSuccess === 'success') {
      toast.success('Logged in successfully!');
      router.replace('/gems', { scroll: false });
    }
  },  [searchParams, router]);

  useEffect(() => {
    const fetchGems = async () => {
      try {
        const response = await fetch('/api/gems');
        const data = await response.json();
        setGems(data.gems);
      } catch (error) {
        console.error("Failed to fetch gems:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGems();
  }, [])


  const handleAddNewGem = async (formData) => {
    const response = await fetch('/api/gems', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      body: formData,
    });
    if (response.ok) {
      toast.success('Gem saved successfully!');
      // const result = await response.json();
      // const newGemForState = {
      //   ...newGemData,
      //   _id: result.insertedId,
      //   submittedBy: session.user.username,
      // };
      // setGems([...gems, newGemForState]);
      // OR,
      // const res = await fetch('/api/gems');
      // const data = await res.json();
      // setGems(data.gems);
      // OR,

      const newGemFromServer = await response.json();
      setGems((previousGem) => [...previousGem, newGemFromServer]);
    } else {
      toast.error('Failed to save the gem!');
      console.error('Failed to save the gem to the database.');
    }
  };

  const handledDeleteGem = async (id) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/gems/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        toast.success('Gem deleted!');
        setGems(gems.filter(gem => gem._id !== id));
      }
      else {
        toast.error('Failed to delete the gem!');
        console.error('Failed to delete the gem.');
      }

    } catch (error) {
      toast.error('An error occurred.');
      console.error('An error occurred:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedGem.location)
      setIsCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => {
        setIsCopied(false)
      }, 2000);
    } catch (error) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <main>
      {/* <h1 className="text-4xl font-bold text-center mb-6 mt-6 text-black">Local Gems</h1> */}
      {session &&
        <div>
          <NewGemForm onAddGem={handleAddNewGem} />
          <hr className="h-0.5 w-11/12 mx-auto bg-gray-500 mt-10" />
        </div>
      }
      <div className="mt-8">
        {isLoading ? (
          <p className="text-lg font-bold text-center text-gray-600">Loading gems...</p>
        ) : (
          <div>
            <h1 className="text-4xl font-bold text-center mb-6 mt-6 text-white">Local Gems</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gems.map((gem) => (
                <GemCard
                  key={gem._id}
                  onDelete={handledDeleteGem}
                  // _id={gem._id}
                  // name={gem.name}
                  // description={gem.description}
                  // submittedBy={gem.submittedBy}
                  // OR, use the spread operator
                  {...gem}
                  session={session}
                  deletingId={deletingId}
                  onClick={() => {
                    // console.log('Card clicked! Setting this gem:', gem);
                    setSelectedGem(gem)
                  }}
                />
              ))}
              {console.log(selectedGem)}
            </div>
          </div>
        )
        }
      </div>
      <Modal isOpen={selectedGem} onClose={() => setSelectedGem(null)}>
        {selectedGem && (
          <div className="">
            <h2 className="text-3xl font-bold m-3 mt-0 text-blue-700">{selectedGem.name}</h2>
            {selectedGem.imageUrl &&
                <Image className="mx-auto mb-3" width={250} height={250} src={selectedGem.imageUrl} alt={`${selectedGem.name} image`}></Image>
              // <div className="bg-slate-900 w-1/2 mx-auto p-2 rounded-lg mb-3">
              // </div>
            }
            <div className="bg-slate-800 text-white p-2 mb-3 rounded-lg">
              <p className="font-bold">Description: </p>
              <p className="text-white  whitespace-pre-wrap">{selectedGem.description}</p>
            </div>
            <div className="bg-slate-800 text-white p-2 mb-3 rounded-lg">
              <div className="flex justify-between items-center">
                <p className="font-bold">Location: </p>
                <img onClick={handleCopy} className="w-5 h-5 invert hover:cursor-pointer hover:scale-110 transition duration-300 ease-in-out" src="/copy.png" alt="" />
              </div>
              <div className="flex items-center gap-1">
                <img className="w-4.5 h-4.5" src="/location.png" alt="" />
                <p className="text-white whitespace-pre-wrap">{selectedGem.location}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 italic">Submitted by: {selectedGem.submittedBy}</p>
          </div>
        )}
      </Modal>
    </main>
  );
}