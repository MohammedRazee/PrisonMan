import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface Cell {
  id: string;
  cellNumber: string;
  block: string;
  capacity: number;
  currentOccupancy: number;
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Closed';
  type: 'Standard' | 'Solitary' | 'Medical' | 'Protective';
  inmates: string[];
}

const CellsPanel = () => {
  const [cells, setCells] = useState<Cell[]>([
    {
      id: '1',
      cellNumber: 'A-101',
      block: 'A',
      capacity: 2,
      currentOccupancy: 1,
      status: 'Occupied',
      type: 'Standard',
      inmates: ['John Doe (INM001)'],
    },
    {
      id: '2',
      cellNumber: 'B-205',
      block: 'B',
      capacity: 2,
      currentOccupancy: 1,
      status: 'Occupied',
      type: 'Standard',
      inmates: ['Jane Smith (INM002)'],
    },
    {
      id: '3',
      cellNumber: 'C-301',
      block: 'C',
      capacity: 1,
      currentOccupancy: 0,
      status: 'Available',
      type: 'Solitary',
      inmates: [],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCell, setNewCell] = useState({
    cellNumber: '',
    block: '',
    capacity: '',
    type: 'Standard' as 'Standard' | 'Solitary' | 'Medical' | 'Protective',
    status: 'Available' as 'Available' | 'Occupied' | 'Maintenance' | 'Closed',
  });

  const filteredCells = cells.filter(cell =>
    cell.cellNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cell.block.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCell = () => {
    if (!newCell.cellNumber || !newCell.block || !newCell.capacity) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const cell: Cell = {
      id: Date.now().toString(),
      cellNumber: newCell.cellNumber,
      block: newCell.block,
      capacity: parseInt(newCell.capacity),
      currentOccupancy: 0,
      status: newCell.status,
      type: newCell.type,
      inmates: [],
    };

    setCells([...cells, cell]);
    setNewCell({ cellNumber: '', block: '', capacity: '', type: 'Standard', status: 'Available' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Cell added successfully",
    });
  };

  const handleDeleteCell = (id: string) => {
    setCells(cells.filter(cell => cell.id !== id));
    toast({
      title: "Success",
      description: "Cell removed successfully",
    });
  };

  const handleStatusChange = (id: string, newStatus: 'Available' | 'Occupied' | 'Maintenance' | 'Closed') => {
    setCells(cells.map(cell => 
      cell.id === id ? { ...cell, status: newStatus } : cell
    ));
    toast({
      title: "Success",
      description: `Cell status updated to ${newStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Occupied': return 'bg-blue-100 text-blue-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Cells Management</h2>
          <p className="text-slate-600">Monitor and manage cell assignments</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              Add New Cell
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Cell</DialogTitle>
              <DialogDescription>
                Enter the cell information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cellNumber">Cell Number</Label>
                <Input
                  id="cellNumber"
                  value={newCell.cellNumber}
                  onChange={(e) => setNewCell({ ...newCell, cellNumber: e.target.value })}
                  placeholder="e.g., A-101"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="block">Block</Label>
                <Input
                  id="block"
                  value={newCell.block}
                  onChange={(e) => setNewCell({ ...newCell, block: e.target.value })}
                  placeholder="e.g., A, B, C"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newCell.capacity}
                  onChange={(e) => setNewCell({ ...newCell, capacity: e.target.value })}
                  placeholder="Number of inmates"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Cell Type</Label>
                <Select value={newCell.type} onValueChange={(value: 'Standard' | 'Solitary' | 'Medical' | 'Protective') => setNewCell({ ...newCell, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cell type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Solitary">Solitary</SelectItem>
                    <SelectItem value="Medical">Medical</SelectItem>
                    <SelectItem value="Protective">Protective</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddCell}>Add Cell</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between items-center">
        <Input
          placeholder="Search cells..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <span className="text-slate-600">Total: {cells.length} cells</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCells.map((cell) => (
          <Card key={cell.id} className="bg-white border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{cell.cellNumber}</CardTitle>
                  <CardDescription>Block {cell.block} • {cell.type}</CardDescription>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteCell(cell.id)}
                >
                  Delete
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Status:</span>
                <Select value={cell.status} onValueChange={(value: 'Available' | 'Occupied' | 'Maintenance' | 'Closed') => handleStatusChange(cell.id, value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Occupied">Occupied</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-600">Occupancy:</span>
                  <span>{cell.currentOccupancy}/{cell.capacity}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(cell.currentOccupancy / cell.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>

              {cell.inmates.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-slate-600">Current Inmates:</span>
                  <ul className="mt-1 space-y-1">
                    {cell.inmates.map((inmate, index) => (
                      <li key={index} className="text-sm text-slate-700 bg-slate-50 p-2 rounded">
                        {inmate}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCells.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No cells found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default CellsPanel;
